// parser functions to unpack the words described in https://rawgit.com/wiki/GriffinCollaboration/GRSISort/technical-docs/GRIFFIN_Event_Format.pdf

PPGparser = function(){

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

    //index corresponds to detector id number
    this.detectorType = [
        'HPGe Low Gain',
        'HPGe High Gain',
        'SCEPTAR',
        'DANTE Energy',
        'DANTE Time',
        'PACES',
        'DESCANT',
        'HPGe BGO Suppressors',
        'DANTE BGO Suppressors',
        'ZDS',
        'DESCANT gamma PS',
        'DESCANT neutron PS',
        'Undefined Detector',
        'Undefined Detector',
        'Undefined Detector',
        'Scaler'
    ]

    //////////////////////////////
    // core parser functions
    //////////////////////////////

    this.parsers = {};
    this.parsers.I = function(word, unpacked){
        //parse a type I word
        //<word>: number; 32 bits corresponding to a type I word
        //<unpacked>: object; a key-value store for holding the unpacked results

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
            dataStore.PPGwordFlags['moduleType'] = 'Invalid module code, found ' + unpacked['moduleType'][0];
        }

        //address
        unpacked['masterChan']     = [(unpacked['address'] & 0xF000) >>> 12];
        unpacked['slaveChan']      = [(unpacked['address'] & 0x0F00) >>> 8];
        unpacked['collectorChan']  = [(unpacked['address'] & 0x00FF) >>> 0];
        unpacked['address'][1] = 'Master: ' + unpacked['masterChan'] + '; Slave: ' + unpacked['slaveChan'] + '; Collector: ' + unpacked['collectorChan'];

        //detector type
        if(unpacked['detType'][0] < this.detectorType.length)
            unpacked['detType'][1] = this.detectorType[unpacked['detType'][0]];
        else{
            unpacked['detType'][1] = 'Invalid detector code, found ' + unpacked['detType'][0];
            dataStore.PPGwordFlags['detType'] = 'Invalid detector code, found ' + unpacked['detType'][0];
        }

    }.bind(this);

    this.parsers.II = function(word, unpacked){
        //parse a type II word
        //<word>: number; 32 bits corresponding to a type II word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeIIpacketType']          = [(word & 0xF0000000) >>> 28];
        unpacked['networkPacketCounterValue'] = [(word & 0x0FFFFFFF) >>> 0];

    }.bind(this);

    this.parsers.III = function(word, unpacked){
        //parse a type III word
        //<word>: number; 32 bits corresponding to a type III word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeIIIpacketType']  = [(word & 0xF0000000) >>> 28];
        unpacked['expectedPPGpattern'] = [(word & 0x0FFFFFFF) >>> 0];

    }.bind(this);

    this.parsers.IV = function(word, unpacked){
        //parse a type IV word
        //<word>: number; 32 bits corresponding to a type IV word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeIVpacketType']    = [(word & 0xF0000000) >>> 28];
        unpacked['confirmedPPGpattern'] = [(word & 0x0FFFFFFF) >>> 0];

    }.bind(this);

    this.parsers.V = function(word, unpacked){
        //parse a type V word
        //<word>: number; 32 bits corresponding to a type V word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeVpacketType']  = [(word & 0xF0000000) >>> 28];
        unpacked['timestampLowBits'] = [(word & 0x0FFFFFFF) >>> 0];

    }.bind(this);

    this.parsers.VI = function(word, unpacked){
        //parse a type VI word
        //<word>: number; 32 bits corresponding to a type VI word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeVIpacketType']  = [(word & 0xF0000000) >>> 28];
        unpacked['timestampHighBits'] = [(word & 0x0FFFFFFF) >>> 0];

    }.bind(this);

    this.parsers.VII = function(word, unpacked){
        //parse a type VII word
        //<word>: number; 32 bits corresponding to a type VII word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeVIIpacketType']  = [(word & 0xF0000000) >>> 28];
        unpacked['previousPPGpattern'] = [(word & 0x0FFFFFFF) >>> 0];

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

        return 0;

    }

    /////////////////////
    // full chain
    /////////////////////

    this.assessComposition = function(words){
        //<words>: array of numbers; corresponds to the words composing one event.
        //check that the types and configurations of words make sense.
        //return an array, empty if all good, containing strings describing mistakes otherwise.

        var nTypeIV = 0,
            nTypeVIIa = 0;
           
        dataStore.PPGcompositionalFlags = [];

        //must have exactly 7 words
        if(words.length != 7){
            dataStore.PPGcompositionalFlags.push('Incorrect number of words for a PPG event.')
            return;
        }

        //first word must start with 0x8
        if( (words[0] & 0xF0000000) >>> 28 != 8 )
            dataStore.PPGcompositionalFlags.push('First word does not start with 0x8');

        //second word must start with 0xD
        if( (words[1] & 0xF0000000) >>> 28 != 0xD )
            dataStore.PPGcompositionalFlags.push('Second word does not start with 0xD');

        //third word must start with 00
        if( (words[2] & 0xF0000000) >>> 28 != 0 )
            dataStore.PPGcompositionalFlags.push('Third word does not start with 0x0');

        //fourth word must start with 9
        if( (words[3] & 0xF0000000) >>> 28 != 0x9 )
            dataStore.PPGcompositionalFlags.push('Fourth word does not start with 0x9'); 

        //fifth word must start with 0xA
        if( (words[4] & 0xF0000000) >>> 28 != 0xA )
            dataStore.PPGcompositionalFlags.push('Fifth word does not start with 0xA');

        //sixth word must start with 0xB
        if( (words[5] & 0xF0000000) >>> 28 != 0xB )
            dataStore.PPGcompositionalFlags.push('Sixth word does not start with 0xB');

        //seventh word must start with 0xE
        if( (words[6] & 0xF0000000) >>> 28 != 0xE )
            dataStore.PPGcompositionalFlags.push('Seventh word does not start with 0xE'); 
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
        this.parsers.IV(words[3], unpacked);
        this.parsers.V(words[4], unpacked);
        this.parsers.VI(words[5], unpacked);
        this.parsers.VII(words[6], unpacked);

        //post processing
        this.reconstructTimestamp(unpacked);

        return unpacked
    }

}







