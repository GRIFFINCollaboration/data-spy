// parser functions to unpack the words described in https://rawgit.com/wiki/GriffinCollaboration/GRSISort/technical-docs/GRIFFIN_Event_Format.pdf

scalerParser = function(){

    ////////////////////
    // member data
    ////////////////////

    //index corresponds to unpacked data type number
    this.moduleType = [
        null,
        'GRIF-16',
        'GRIF-4G',
        'GRIF-C Slave',
        'GRIF-C Master'
    ]

    //////////////////////////////
    // core parser functions
    //////////////////////////////

    this.parsers = {};
    this.parsers.I = function(word, unpacked){
        //parse a type I word
        //<word>: number; 32 bits corresponding to a type I word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('ScalerwordIvalue'))
            document.getElementById('ScalerwordIvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeIpacketType']   = [(word & 0xF0000000) >>> 28];
        unpacked['moduleType']        = [(word & 0x0E000000) >>> 25];
        unpacked['wordCount']         = [(word & 0x01F00000) >>> 20];
        unpacked['address']           = [(word & 0x000FFFF0) >>> 4];
        unpacked['detType']           = [(word & 0x0000000F) >>> 0];

        //decode results where necessary:

        //module type
        if(unpacked['moduleType'][0] < this.moduleType.length)
            unpacked['moduleType'][1] = this.moduleType[unpacked['moduleType'][0]];
        else{
            unpacked['moduleType'][1] = 'Invalid module code, found ' + unpacked['moduleType'][0];
            dataStore.scalerWordFlags['moduleType'] = 'Invalid module code, found ' + unpacked['moduleType'][0];
        }

        //address
        unpacked['masterChan']     = [(unpacked['address'] & 0xF000) >>> 12];
        unpacked['slaveChan']      = [(unpacked['address'] & 0x0F00) >>> 8];
        unpacked['collectorChan']  = [(unpacked['address'] & 0x00FF) >>> 0];
        unpacked['address'][1] = 'Master: ' + unpacked['masterChan'] + '; Slave: ' + unpacked['slaveChan'] + '; Collector: ' + unpacked['collectorChan'];

    }.bind(this);

    this.parsers.II = function(word, unpacked){
        //parse a type II word
        //<word>: number; 32 bits corresponding to a type II word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('ScalerwordIIvalue'))
            document.getElementById('ScalerwordIIvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeIIpacketType']          = [(word & 0xF0000000) >>> 28];
        unpacked['networkPacketCounterValue'] = [(word & 0x0FFFFFFF) >>> 0];

    }.bind(this);

    this.parsers.III = function(word, unpacked){
        //parse a type III word
        //<word>: number; 32 bits corresponding to a type III word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('ScalerwordIIIvalue'))
            document.getElementById('ScalerwordIIIvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeIIIpacketType']  = [(word & 0xF0000000) >>> 28];
        unpacked['timestampLowBits'] = [(word & 0x0FFFFFFF) >>> 0];

    }.bind(this);

    this.parsers.IV = function(word, unpacked){
        //parse a type IV word
        //<word>: number; 32 bits corresponding to a type IV word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //could have multiple copies of this word, need to pack results in arrays:
        if(!unpacked.hasOwnProperty('scalerValue'))
            unpacked['scalerValue'] = [];

        //slice up word
        unpacked['scalerValue'].push([(word & 0xFFFFFFFF) >>> 0]);

        // add word to title row
        if(document.getElementById('ScalerwordIVvalue'))
            document.getElementById('ScalerwordIVvalue').innerHTML = '(' + unpacked['scalerValue'].length + ' words)';

    }.bind(this);    

    this.parsers.V = function(word, unpacked){
        //parse a type V word
        //<word>: number; 32 bits corresponding to a type V word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('ScalerwordVvalue'))
            document.getElementById('ScalerwordVvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeVpacketType']  = [(word & 0xF0000000) >>> 28];
        unpacked['scalerType']  = [(word & 0x0F000000) >>> 24];
        unpacked['timestampHighBits']  = [(word & 0x00FFFF00) >>> 8];
        unpacked['repeatedTimeStampLowBits']  = [(word & 0x000000FF) >>> 0];

        //parse
        if(unpacked['scalerType'][0] == 0)
            unpacked['scalerType'][1] = 'deadtime'
        else
            unpacked['scalerType'][1] = 'rate'

    }.bind(this);    


    ///////////////////////
    // post-processing
    ///////////////////////

    this.reconstructTimestamp = function(unpacked){
        //<unpacked>: object; a key-value store for holding the unpacked results
        //recombine the timestamp from its fragments

        unpacked.timestamp    = [(unpacked.timestampHighBits[0] * Math.pow(2, 28)) + unpacked.timestampLowBits[0]]; //yes, adding - ok since bitshift, gets around JS sigining.
        unpacked.timestamp[1] = unpacked.timestamp[0]*10 + ' ns' 
    }

    this.postProcessingFlags = function(unpacked){
        //<unpacked>: object; a key-value store for holding the unpacked results
        //final check for inconsistencies after all unpacking complete.

        // repeated timestamp bits should match
        if( (unpacked.timestampLowBits[0] & 0xFF) != unpacked['repeatedTimeStampLowBits'][0] ){
            dataStore.scalerWordFlags['timestampLowBits'] = "Repeated timestamp bits don't match.";
            dataStore.scalerWordFlags['repeatedTimeStampLowBits'] = '';
        }

    }

    /////////////////////
    // full chain
    /////////////////////

    this.assessComposition = function(words){
        //<words>: array of numbers; corresponds to the words composing one event.
        //check that the types and configurations of words make sense.
        //return an array, empty if all good, containing strings describing mistakes otherwise.
        
        dataStore.scalerCompositionalFlags = [];

        //must have at least 5 words
        if(words.length < 5){
            dataStore.scalerCompositionalFlags.push('Too few words for a scaler event.')
            return;
        }

        //first word must start with 0x8
        if( (words[0] & 0xF0000000) >>> 28 != 8 )
            dataStore.scalerCompositionalFlags.push('First word does not start with 0x8');

        //second word must start with 0xD
        if( (words[1] & 0xF0000000) >>> 28 != 0xD )
            dataStore.scalerCompositionalFlags.push('Second word does not start with 0xD');

        //third word must start with 0xA
        if( (words[2] & 0xF0000000) >>> 28 != 0xA )
            dataStore.scalerCompositionalFlags.push('Third word does not start with 0xA');

        //last word must start with 0xE
        if( (words[words.length-1] & 0xF0000000) >>> 28 != 0xE )
            dataStore.scalerCompositionalFlags.push('Last word does not start with 0xE'); 

        dataStore.scalerFragmentDetails = {
            'nScalerValues' : words.length - 4
        }

    }

    this.unpackAll = function(words){
        //<words>: array of numbers; corresponds to the words composing one event.
        //run unpacking on all words in the event. Assumes words represents a valid event; raise flags elsewhere.

        var unpacked = {},
            i;

        //parse the event
        this.parsers.I(words[0], unpacked);
        this.parsers.II(words[1], unpacked);
        this.parsers.III(words[2], unpacked);
        for(i=0; i<dataStore.scalerFragmentDetails.nScalerValues; i++){
            this.parsers.IV(words[3+i], unpacked);
        }
        this.parsers.V(words[words.length-1], unpacked);

        //post processing
        this.reconstructTimestamp(unpacked);

        return unpacked
    }

}







