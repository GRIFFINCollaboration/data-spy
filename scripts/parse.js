// parser functions to unpack the words described in https://rawgit.com/wiki/GriffinCollaboration/GRSISort/technical-docs/GRIFFIN_Event_Format.pdf

GRIFFINparser = function(){

    ////////////////////
    // member data
    ////////////////////

    //index corresponds to unpacked data type number
    this.dataType = [
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
        'Undefined Detector'
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
        unpacked['packetType']        = (word & 0xF0000000) >>> 28;
        unpacked['pileUpType']        = (word & 0x0C000000) >>> 26;
        unpacked['dataType']          = (word & 0x03800000) >>> 23;
        unpacked['numFilterPatterns'] = (word & 0x00700000) >>> 20;
        unpacked['address']           = (word & 0x000FFFF0) >>> 4;
        unpacked['detType']           = (word & 0x0000000F) >>> 0;

        //decode results
        //pileup
        if(unpacked['pileUpType'] >=0 && unpacked['pileUpType'] < 3)
            unpacked['pileUpType'] = unpacked['pileUpType'] + 1 + ' hits';
        else
            unpacked['pileUpType'] = 'Read ' + unpacked['pileUpType'] + ', > 3 hits.';
        //data type
        if(unpacked['dataType'] > 0 && unpacked['dataType'] < this.dataType.length)
            unpacked['dataType'] = this.dataType[unpacked['dataType']];
        else
            unpacked['dataType'] = 'Read ' + unpacked['dataType'] + ', invalid data type.';
        //address
        unpacked['masterChan'] = (unpacked['address'] & 0xF000) >>> 12;
        unpacked['slaveChan']  = (unpacked['address'] & 0x0F00) >>> 8;
        unpacked['collectorChan']  = (unpacked['address'] & 0x00FF) >>> 0;
        //detector type
        if(unpacked['detType'] < this.detectorType.length)
            unpacked['detType'] = this.detectorType[unpacked['detType']];
        else
            unpacked['detType'] = 'Invalid detector code, found ' + unpacked['detType'];

    }.bind(this);

    this.parsers.II = function(word, unpacked){
        //parse a type II word
        //<word>: number; 32 bits corresponding to a type II word
        //<unpacked>: object; a key-value store for holding the unpacked results

        var i, patternsPassed;

        //slice up word
        unpacked['typeIIhead']                 = (word & 0xC0000000) >>> 30;
        unpacked['masterFilterPatternsPassed'] = (word & 0x3FFF0000) >>> 16;
        unpacked['PPGpattern']                 = (word & 0x0000FFFF) >>> 0;

        //decode results
        //filter patterns
        patternsPassed = '';
        for(i=0; i<16; i++){
            if(unpacked['masterFilterPatternsPassed'] & (1<<i))
                patternsPassed += (i+1) + ', ';
        }

        patternsPassed = patternsPassed.slice(0, -2) + '.';
        unpacked['masterFilterPatternsPassed'] = 'Passed filters ' + patternsPassed;

    }.bind(this);

    this.parsers.III = function(word, unpacked){
        //parse a type III word
        //<word>: number; 32 bits corresponding to a type III word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeIIIhead']    = (word & 0x80000000) >>> 31;
        unpacked['masterFilterID'] = (word & 0x7FFFFFFF) >>> 0;

    }.bind(this);

    this.parsers.IV = function(word, unpacked){
        //parse a type IV word
        //<word>: number; 32 bits corresponding to a type IV word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeIVPacketType'] = (word & 0xF0000000) >>> 28;
        unpacked['channelTriggerID'] = (word & 0x0FFFFFFF) >>> 0;
    }.bind(this);

    this.parsers.V = function(word, unpacked){
        //parse a type V word
        //<word>: number; 32 bits corresponding to a type V word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeVPacketType']  = (word & 0xF0000000) >>> 28;
        unpacked['timestampLowBits'] = (word & 0x0FFFFFFF) >>> 0;
    }.bind(this);

    this.parsers.VI = function(word, unpacked){
        //parse a type VI word
        //<word>: number; 32 bits corresponding to a type VI word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeVIPacketType']  = (word & 0xF0000000) >>> 28;
        unpacked['deadtime']          = (word & 0x0FFFC000) >>> 14;
        unpacked['timestampHighBits'] = (word & 0x00003FFF) >>> 0;

        //decode results
        //deadtime
        unpacked['deadtime'] = unpacked['deadtime']*10 + ' ns';

    }.bind(this);

    this.parsers.VIa = function(word, unpacked){
        //parse a type VIa word
        //<word>: number; 32 bits corresponding to a type VIa word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeVIaPacketType'] = (word & 0xF0000000) >>> 28;
        unpacked['networkPacketID']   = (word & 0x0FFFFFFF) >>> 0;
    }.bind(this);

    this.parsers.VIb = function(word, unpacked){
        //parse a type VIb word
        //<word>: number; 32 bits corresponding to a type VIb word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeVIbPacketType'] = (word & 0xF0000000) >>> 28;
        unpacked['waveformSample']    = (word & 0x0FFFFFFF) >>> 0;
    }.bind(this);

    this.parsers.VII = function(word, unpacked){
        //parse a type VII word
        //<word>: number; 32 bits corresponding to a type VII word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeVIIhead'] = (word & 0x80000000) >>> 31;
        unpacked['K1upper'] = (word & 0x7C000000) >>> 26;
        unpacked['K1pulseHeight'] = (word & 0x03FFFFFF) >>> 0;
    }.bind(this);

    this.parsers.VIII = function(word, unpacked){
        //parse a type VIII word
        //<word>: number; 32 bits corresponding to a type VIII word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeVIIIhead'] = (word & 0x80000000) >>> 31;
        unpacked['K1lower'] = (word & 0x7C000000) >>> 26;
        unpacked['K1ampCorrectedTiming'] = (word & 0x03FFFFFF) >>> 0;

        //decode results
        unpacked['K1ampCorrectedTiming'] = unpacked['K1ampCorrectedTiming']*10 + ' ns'

    }.bind(this);

    this.parsers.IX = function(word, unpacked){
        //parse a type IX word
        //<word>: number; 32 bits corresponding to a type IX word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeIXhead'] = (word & 0x80000000) >>> 31;
        unpacked['K2upper'] = (word & 0x7C000000) >>> 26;
        unpacked['K2pulseHeight'] = (word & 0x03FFFFFF) >>> 0;
    }.bind(this);

    this.parsers.X = function(word, unpacked){
        //parse a type X word
        //<word>: number; 32 bits corresponding to a type X word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeXhead'] = (word & 0x80000000) >>> 31;
        unpacked['K2lower'] = (word & 0x7C000000) >>> 26;
        unpacked['K2ampCorrectedTiming'] = (word & 0x03FFFFFF) >>> 0;

        //decode results
        unpacked['K2ampCorrectedTiming'] = unpacked['K2ampCorrectedTiming']*10 + ' ns'
    }.bind(this);

    this.parsers.XI = function(word, unpacked){
        //parse a type XI word
        //<word>: number; 32 bits corresponding to a type XI word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeXIhead'] = (word & 0x80000000) >>> 31;
        unpacked['K3upper'] = (word & 0x7C000000) >>> 26;
        unpacked['K3pulseHeight'] = (word & 0x03FFFFFF) >>> 0;
    }.bind(this);

    this.parsers.XII = function(word, unpacked){
        //parse a type XII word
        //<word>: number; 32 bits corresponding to a type XII word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeXIIhead'] = (word & 0x80000000) >>> 31;
        unpacked['K3lower'] = (word & 0x7C000000) >>> 26;
        unpacked['K3ampCorrectedTiming'] = (word & 0x03FFFFFF) >>> 0;

        //decode results
        unpacked['K3ampCorrectedTiming'] = unpacked['K3ampCorrectedTiming']*10 + ' ns'
    }.bind(this);


    ///////////////////////
    // post-processing
    ///////////////////////

    this.reconstructTimestamp = function(unpacked){
        //<unpacked>: object; a key-value store for holding the unpacked results
        //recombine the timestamp from info in words V and VI

        unpacked.timestamp = (unpacked.timestampHighBits * Math.pow(2, 28)) + unpacked.timestampLowBits; //yes, adding - ok since bitshift, gets around JS sigining.
    }

    this.assembleK = function(lower, upper){
        //<lower>: number; lowest 5 bits == least significant 5 bits of K value
        //<upper>: number; lowest 5 bits == next 5 bits of K
        //returns the K value corresponding to these two chunks

        return upper*Math.pow(2,5) + (lower & 0x1F)
    }

    this.reconstructK = function(unpacked){
        //<unpacked>: object; a key-value store for holding the unpacked results
        //reassembles all present Ks.

        if(typeof unpacked.K1upper == 'number' && typeof unpacked.K1lower == 'number'){
            unpacked.K1 = this.assembleK(unpacked.K1lower, unpacked.K1upper);
        }

        if(typeof unpacked.K1upper == 'number' && typeof unpacked.K1lower == 'number'){
            unpacked.K2 = this.assembleK(unpacked.K2lower, unpacked.K2upper);
        }

        if(typeof unpacked.K3upper == 'number' && typeof unpacked.K3lower == 'number'){
            unpacked.K3 = this.assembleK(unpacked.K3lower, unpacked.K3upper);
        }
    }

    /////////////////////
    // full chain
    /////////////////////

    this.assessComposition = function(words){
        //<words>: array of numbers; corresponds to the words composing one event.
        //check that the types and configurations of words make sense.
        //return an array, empty if all good, containing strings describing mistakes otherwise.

        var i, flags = [],
            waveformWords;

        //must have at least 9 words
        if(words.length < 9){
            flags.push('Not enough words to make an event.')
            return flags;
        }

        //first word must start with 0x8
        if( (words[0] & 0xF0000000) >>> 28 != 8 )
            flags.push('First word does not start with 0x8');

        //second word must start with 00
        if( (words[1] & 0xC0000000) >>> 30 != 0 )
            flags.push('Second word does not start with 00');

        //third word must start with 0
        if( (words[2] & 0x80000000) >>> 31 != 0 )
            flags.push('Third word does not start with 0');

        //fourth word must start with 0x9
        if( (words[3] & 0xF0000000) >>> 28 != 9 )
            flags.push('Fourth word does not start with 0x9'); 

        //fifth word must start with 0xa
        if( (words[4] & 0xF0000000) >>> 28 != 0xA )
            flags.push('Fifth word does not start with 0xA');

        //sixth word must start with 0xB
        if( (words[5] & 0xF0000000) >>> 28 != 0xB )
            flags.push('Sixth word does not start with 0xB'); 

        //seventh word must start with either 0xD or 0xC or 0
        if( ((words[6] & 0xF0000000) >>> 28 != 0xD) && ((words[6] & 0xF0000000) >>> 28 != 0xC) && ((words[6] & 0x80000000) >>> 31 != 0))
            flags.push('Seventh word does not start with 0xD or 0xC or 0');

        //allow a run of type VIb words, possibly after a type VIa word, before a type VII word
        //determine earliest possible index for type VIb word
        if( ((words[6] & 0xF0000000) >>> 28 == 0xD) )
            waveformWords = 7;
        else
            waveformWords = 6;

        while(true){
            if ((words[waveformWords] & 0x80000000) >>> 31 == 0) break;

            if( ((words[waveformWords] & 0xF0000000) >>> 28 == 0xC) )
                waveformWords++;
            else
                flags.push('Unrecognized word between words VI and VII')
        }

        //must end in event trailer:
        if( (words[words.length - 1] & 0xF0000000) >>> 28 != 0xE ){
            flags.push('Final word does not start with 0xE');
            return flags; 
        }   

        //K-words come in pairs and are concluded by the event trialer word:
        //waveformWords now points at the type VII word
        if( (words.length - waveformWords)%2 != 1 ){
            flags.push('Odd number of K words (should come in pairs)')
        }

        //make sure K-words all start with 0
        for(i=waveformWords; i<words.length; i++){
            if( (words[i] & 0x80000000) >>> 31 != 0 )
                flags.push('K-word does not start with 0');
                return flags   
        }

        return flags;
    }

    this.unpackAll = function(words){
        //<words>: array of numbers; corresponds to the words composing one event.
        //run unpacking on all words in the event. Assumes words represents a valid event; raise flags elsewhere.

        var unpacked = {},
            waveformWords,
            i, K;

        this.parsers.I(words[0], unpacked);
        this.parsers.II(words[1], unpacked);
        this.parsers.III(words[2], unpacked);
        this.parsers.IV(words[3], unpacked);
        this.parsers.V(words[4], unpacked);
        this.parsers.VI(words[5], unpacked);

        //is there a type VIa word?
        if( ((words[6] & 0xF0000000) >>> 28 == 0xD) ){
            this.parsers.VIa(words[6], unpacked);
            waveformWords = 7;
        } else
            waveformWords = 6;

        //unpack any type VIb words, if present
        while(true){
            if ((words[waveformWords] & 0x80000000) >>> 31 == 0) break;

            this.parsers.VIb(words[waveformWords], unpacked);
            waveformWords++;
        }

        //unpack K-words
        K = 1;
        for(i=waveformWords; i<words.length-1; i+=2){
            if(K == 1){
                this.parsers.VII(words[i], unpacked);
                this.parsers.VIII(words[i+1], unpacked);
                K++;
            } else if(K == 2){
                this.parsers.IX(words[i], unpacked);
                this.parsers.X(words[i+1], unpacked);
                K++;
            } else if(K == 3){
                this.parsers.XI(words[i], unpacked);
                this.parsers.XII(words[i+1], unpacked);
                K++;
            }
        }

        //unpack event trailer
        //TBD

        //post processing
        this.reconstructTimestamp(unpacked);
        this.reconstructK(unpacked);

        return unpacked
    }

}







