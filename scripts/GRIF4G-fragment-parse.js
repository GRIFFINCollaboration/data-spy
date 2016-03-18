// parser functions to unpack the words described in https://rawgit.com/wiki/GriffinCollaboration/GRSISort/technical-docs/GRIFFIN_Event_Format.pdf

GRIF4GfragmentParser = function(){

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

        // add word to title row
        if(document.getElementById('4GwordIvalue'))
            document.getElementById('4GwordIvalue').innerHTML = '0x' + word.toString(16);

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
            dataStore.GRIF4GfragmentWordFlags['moduleType'] = 'Invalid module code, found ' + unpacked['moduleType'][0];
        }

        //word count
        if(unpacked['wordCount'][0] != dataStore.GRIF4GfragmentDetails.nTokens)
            dataStore.GRIF4GfragmentWordFlags['wordCount'] = 'Mismatch between number of words found (' + dataStore.GRIF4GfragmentDetails.nTokens + ') and number of words reported in the header (' + unpacked['wordCount'][0] + ')'

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
            dataStore.GRIF4GfragmentWordFlags['detType'] = 'Invalid detector code, found ' + unpacked['detType'][0];
        }

    }.bind(this);

    this.parsers.II = function(word, unpacked){
        //parse a type II word
        //<word>: number; 32 bits corresponding to a type II word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('4GwordIIvalue'))
            document.getElementById('4GwordIIvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeIIpacketType']          = [(word & 0xF0000000) >>> 28];
        unpacked['networkPacketCounterValue'] = [(word & 0x0FFFFFFF) >>> 0];

    }.bind(this);

    this.parsers.III = function(word, unpacked){
        //parse a type III word
        //<word>: number; 32 bits corresponding to a type III word
        //<unpacked>: object; a key-value store for holding the unpacked results

        var patternsPassed, i;

        // add word to title row
        if(document.getElementById('4GwordIIIvalue'))
            document.getElementById('4GwordIIIvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeIIIhead']       = [(word & 0xC0000000) >>> 30];
        unpacked['filterPatterns']    = [(word & 0x3FFF0000) >>> 16];
        unpacked['waveformIndicator'] = [(word & 0x00008000) >>> 15];
        unpacked['reserved']          = [(word & 0x00007FFF) >>> 0];

        //decode resuls where necessary:
        patternsPassed = '';
        for(i=0; i<16; i++){
            if(unpacked['filterPatterns'] & (1<<i))
                patternsPassed += (i+1) + ', ';
        }
        patternsPassed = patternsPassed.slice(0, -2) + '.';
        unpacked['filterPatterns'][1] = 'Passed filters ' + patternsPassed;

    }.bind(this);

    this.parsers.IV = function(word, unpacked){
        //parse a type IV word
        //<word>: number; 32 bits corresponding to a type IV word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //could have multiple copies of this word, need to pack results in arrays:
        if(!unpacked.hasOwnProperty('typeIVhead'))
            unpacked['typeIVhead'] = [];
        if(!unpacked.hasOwnProperty('filterConditionCounterValue'))
            unpacked['filterConditionCounterValue'] = [];

        //slice up word
        unpacked['typeIVhead'].push([(word & 0x80000000) >>> 31]);
        unpacked['filterConditionCounterValue'].push([(word & 0x7FFFFFFF) >>> 0]);

        // add word to title row
        if(document.getElementById('4GwordIVvalue'))
            document.getElementById('4GwordIVvalue').innerHTML = '(' + unpacked['typeIVhead'].length + ' words)'
    }.bind(this);

    this.parsers.V = function(word, unpacked){
        //parse a type V word
        //<word>: number; 32 bits corresponding to a type V word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('4GwordVvalue'))
            document.getElementById('4GwordVvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeVPacketType']  = [(word & 0xF0000000) >>> 28];
        unpacked['channelAcceptedHitCounter'] = [(word & 0x0FFFFFFF) >>> 0];
    }.bind(this);

    this.parsers.VI = function(word, unpacked){
        //parse a type VI word
        //<word>: number; 32 bits corresponding to a type VI word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('4GwordVIvalue'))
            document.getElementById('4GwordVIvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeVIPacketType'] = [(word & 0xF0000000) >>> 28];
        unpacked['timestampLowBits'] = [(word & 0x0FFFFFFF) >>> 0];

    }.bind(this);

    this.parsers.VII = function(word, unpacked){
        //parse a type VII word
        //<word>: number; 32 bits corresponding to a type VII word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('4GwordVIIvalue'))
            document.getElementById('4GwordVIIvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeVIIPacketType'] = [(word & 0xF0000000) >>> 28];
        unpacked['deadtime']          = [(word & 0x0FFFC000) >>> 14];
        unpacked['timestampHighBits'] = [(word & 0x00003FFF) >>> 0];

        //decode results
        //deadtime
        unpacked['deadtime'][1] = unpacked['deadtime'][0]*10 + ' ns';

    }.bind(this);

    this.parsers.VIIa = function(word, unpacked){
        //parse a type VIIa word
        //<word>: number; 32 bits corresponding to a type VIIa word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //could have multiple copies of this word, need to pack results in arrays:
        if(!unpacked.hasOwnProperty('typeVIIaPacketType'))
            unpacked['typeVIIaPacketType'] = [];
        if(!unpacked.hasOwnProperty('waveformSample'))
            unpacked['waveformSample'] = [];

        //slice up word
        unpacked['typeVIIaPacketType'].push([(word & 0xF0000000) >>> 28]);
        unpacked['waveformSample'].push((word & 0x0FFFFFFF) >>> 0);

    }.bind(this);

    this.parsers.VIII = function(word, unpacked){
        //parse a type VIII word
        //<word>: number; 32 bits corresponding to a type VIII word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('4GwordVIIIvalue'))
            document.getElementById('4GwordVIIIvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeVIIIhead']   = [(word & 0x80000000) >>> 31];
        unpacked['upperIntLength'] = [(word & 0x7C000000) >>> 26];
        unpacked['pulseHeight']    = [(word & 0x03FFFFFF) >>> 0];

        //decode results
        //pulse height
        unpacked['pulseHeight'][1] = unpacked['pulseHeight'][0] + ' (time integral)';

    }.bind(this);

    this.parsers.IX = function(word, unpacked){
        //parse a type IX word
        //<word>: number; 32 bits corresponding to a type IX word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('4GwordIXvalue'))
            document.getElementById('4GwordIXvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeIXhead']     = [(word & 0x80000000) >>> 31];
        unpacked['lowerIntLength'] = [(word & 0x7C000000) >>> 26];
        unpacked['CFD']            = [(word & 0x03FFFFFF) >>> 0];

        //decode results
        //cfd
        unpacked['CFD'][1] = unpacked['CFD'][0]*10 + ' ns';

    }.bind(this);

    this.parsers.X = function(word, unpacked){
        //parse a type X word
        //<word>: number; 32 bits corresponding to a type X word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('4GwordXvalue'))
            document.getElementById('4GwordXvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeXhead']              = [(word & 0x80000000) >>> 31];
        unpacked['upperLongIntLength']     = [(word & 0x7FE00000) >>> 21];
        unpacked['shortChargeIntegration'] = [(word & 0x001FFFFF) >>> 0];

    }.bind(this);

    this.parsers.XI = function(word, unpacked){
        //parse a type XI word
        //<word>: number; 32 bits corresponding to a type XI word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('4GwordXIvalue'))
            document.getElementById('4GwordXIvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeXIhead']         = [(word & 0x80000000) >>> 31];
        unpacked['lowerLongIntLength'] = [(word & 0x7FE00000) >>> 21];
        unpacked['zeroCrossingTime']   = [(word & 0x001FFFFF) >>> 0];

    }.bind(this);

    this.parsers.XII = function(word, unpacked){
        //parse a type XII word
        //<word>: number; 32 bits corresponding to a type XII word
        //<unpacked>: object; a key-value store for holding the unpacked results

        // add word to title row
        if(document.getElementById('4GwordXIIvalue'))
            document.getElementById('4GwordXIIvalue').innerHTML = '0x' + word.toString(16);

        //slice up word
        unpacked['typeXpacketType']                        = [(word & 0xF0000000) >>> 28];
        unpacked['channelAcceptedCounterValue']            = [(word & 0x0FFFC000) >>> 14];
        unpacked['eventTrailerChannelAcceptedHitCounter'] = [(word & 0x00003FFF) >>> 0];

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

    this.reconstructIntegrationLength = function(unpacked){
        //<unpacked>: object; a key-value store for holding the unpacked results
        //recombine the integration lengths from its fragments

        unpacked.integrationLength = [(unpacked.upperIntLength[0] * Math.pow(2, 5)) + unpacked.lowerIntLength[0]]; //yes, adding - ok since bitshift, gets around JS sigining.
        if(dataStore.GRIF4GfragmentDetails.looksLikeDESCANT)
            unpacked.longIntegrationLength = [(unpacked.upperLongIntLength[0] * Math.pow(2, 10)) + unpacked.lowerLongIntLength[0]];
    }

    this.postProcessingFlags = function(unpacked){
        //<unpacked>: object; a key-value store for holding the unpacked results
        //final check for inconsistencies after all unpacking complete.

        //is waveform flag correct?
        if(unpacked['waveformIndicator'] == 1 && dataStore.GRIF4GfragmentDetails.nTypeVIIa == 0)
            dataStore.GRIF4GfragmentWordFlags['waveformIndicator'] = 'Waveform indicator bit set but no waveform samples found.';
        else if(unpacked['waveformIndicator'] == 0 && dataStore.GRIF4GfragmentDetails.nTypeVIIa > 0)
            dataStore.GRIF4GfragmentWordFlags['waveformIndicator'] = 'Waveform indicator bit unset but ' + dataStore.GRIF4GfragmentDetails.nTypeVIIa + ' waveform samples found.';

        // CFD and timestamp-low words should be within 10k units of each other
        if(Math.abs(unpacked['CFD'][0] - unpacked['timestampLowBits'][0]) > 10000){
            dataStore.GRIF4GfragmentWordFlags['CFD'] = "CFD and timestamp low bits should be within 10k units of each other.";
            dataStore.GRIF4GfragmentWordFlags['timestampLowBits'] = '';
        }

    }

    /////////////////////
    // full chain
    /////////////////////

    this.assessComposition = function(words){
        //<words>: array of numbers; corresponds to the words composing one event.
        //check that the types and configurations of words make sense.
        //return an array, empty if all good, containing strings describing mistakes otherwise.

        var nTypeIV = 0,
            nTypeVIIa = 0,
            lastWords,
            looksLikeDESCANT = false;
           
        dataStore.GRIF4GfragmentCompositionalFlags = [];

        //must have at least 10 words
        if(words.length < 10){
            dataStore.GRIF4GfragmentCompositionalFlags.push('Not enough words to make an event.')
            return;
        }

        //first word must start with 0x8
        if( (words[0] & 0xF0000000) >>> 28 != 8 )
            dataStore.GRIF4GfragmentCompositionalFlags.push('First word does not start with 0x8');

        //second word must start with 0xD
        if( (words[1] & 0xF0000000) >>> 28 != 0xD )
            dataStore.GRIF4GfragmentCompositionalFlags.push('Second word does not start with 0xD');

        //third word must start with 00
        if( (words[2] & 0xC0000000) >>> 30 != 0 )
            dataStore.GRIF4GfragmentCompositionalFlags.push('Third word does not start with 00');

        //fourth word must start with 0
        if( (words[3] & 0x80000000) >>> 31 != 0 )
            dataStore.GRIF4GfragmentCompositionalFlags.push('Fourth word does not start with 0'); 

        //allow a run of type IV words:
        while ( (words[3+nTypeIV] & 0x80000000) >>> 31 == 0 )
            nTypeIV++;

        //type V must start with 0x9
        if( (words[3+nTypeIV] & 0xF0000000) >>> 28 != 0x9 )
            dataStore.GRIF4GfragmentCompositionalFlags.push('Missing type V word or type V word out of sequence');

        //type VI must start with 0xA
        if( (words[3+nTypeIV+1] & 0xF0000000) >>> 28 != 0xA )
            dataStore.GRIF4GfragmentCompositionalFlags.push('Missing type VI word or type VI word out of sequence');

        //type VII must start with 0xB
        if( (words[3+nTypeIV+2] & 0xF0000000) >>> 28 != 0xB )
            dataStore.GRIF4GfragmentCompositionalFlags.push('Missing type VII word or type VII word out of sequence');

        //allow a run of type VIIa words
        while ( (words[3+nTypeIV+3+nTypeVIIa] & 0xF0000000) >>> 28 == 0xC )
            nTypeVIIa++;

        //type VIII must start with 0
        if( (words[3+nTypeIV+3+nTypeVIIa] & 0x80000000) >>> 31 != 0 )
            dataStore.GRIF4GfragmentCompositionalFlags.push('Missing type VIII word or type VIII word out of sequence'); 

        //type IX must start with 0
        if( (words[3+nTypeIV+3+nTypeVIIa+1] & 0x80000000) >>> 31 != 0 )
            dataStore.GRIF4GfragmentCompositionalFlags.push('Missing type IX word or type IX word out of sequence'); 

        //determine what's at the end of the event: optional DESCANT words + trailer, or garbage:
        lastWords = words.slice(3+nTypeIV+3+nTypeVIIa+2)

        if( (lastWords[lastWords.length-1] & 0xF0000000) >>> 28 != 0xE){
            dataStore.GRIF4GfragmentCompositionalFlags.push('Missing type XII word or type XII word out of sequence');
            if(lastWords.length != 1 && lastWords.length != 3)
                dataStore.GRIF4GfragmentCompositionalFlags.push('Nonsense number of words at end of event (must have either 1 trailer or 2 DESCANT + 1 trailer)');
        } else{
            if(lastWords.length==3){
                if( (lastWords[0] & 0x80000000) >>> 31 != 0 ||
                    (lastWords[1] & 0x80000000) >>> 31 != 0
                ){
                    dataStore.GRIF4GfragmentCompositionalFlags.push('Garbled DESCANT words (types X and / or XI)'); 
                } else {
                    looksLikeDESCANT = true;
                }
            } else if(lastWords.length != 1){
                    dataStore.GRIF4GfragmentCompositionalFlags.push('Trailer present, but nonsense number of words at end of event (must have either 1 trailer or 2 DESCANT + 1 trailer)'); 
            }
        }

        dataStore.GRIF4GfragmentDetails = {
            'nTypeIV': nTypeIV,
            'nTypeVIIa': nTypeVIIa,
            'nTokens': words.length - nTypeVIIa,
            'looksLikeDESCANT': looksLikeDESCANT
        }
    }

    this.unpackAll = function(words){
        //<words>: array of numbers; corresponds to the words composing one event.
        //run unpacking on all words in the event. Assumes words represents a valid event; raise flags elsewhere.

        var unpacked = {},
            nTypeIV = dataStore.GRIF4GfragmentDetails.nTypeIV,
            nTypeVIIa = dataStore.GRIF4GfragmentDetails.nTypeVIIa,
            looksLikeDESCANT = dataStore.GRIF4GfragmentDetails.looksLikeDESCANT,
            i;

        //parse the event
        this.parsers.I(words[0], unpacked);
        this.parsers.II(words[1], unpacked);
        this.parsers.III(words[2], unpacked);

        for(i=0; i<nTypeIV; i++){
            this.parsers.IV(words[3+i], unpacked)
        }

        this.parsers.V(words[3+nTypeIV], unpacked);
        this.parsers.VI(words[3+nTypeIV+1], unpacked);
        this.parsers.VII(words[3+nTypeIV+2], unpacked);

        for(i=0; i<nTypeVIIa; i++){
            this.parsers.VIIa(words[3+nTypeIV+3+i], unpacked)
        }

        this.parsers.VIII(words[3+nTypeIV+3+nTypeVIIa], unpacked);
        this.parsers.IX(words[3+nTypeIV+3+nTypeVIIa+1], unpacked);
        if(looksLikeDESCANT == 1){
            this.parsers.X(words[3+nTypeIV+3+nTypeVIIa+2], unpacked);
            this.parsers.XI(words[3+nTypeIV+3+nTypeVIIa+3], unpacked);
        }
        this.parsers.XII(words[3+nTypeIV+3+nTypeVIIa+2+2*looksLikeDESCANT], unpacked);

        //post processing
        this.reconstructTimestamp(unpacked);
        this.reconstructIntegrationLength(unpacked);

        return unpacked
    }

}







