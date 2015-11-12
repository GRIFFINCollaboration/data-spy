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

    this.parsers = []
    this.parsers[1] = function(word, unpacked){
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

    this.parsers[2] = function(word, unpacked){
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

    this.parsers[3] = function(word, unpacked){
        //parse a type III word
        //<word>: number; 32 bits corresponding to a type III word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeIIIhead']    = (word & 0x80000000) >>> 31;
        unpacked['masterFilterID'] = (word & 0x7FFFFFFF) >>> 0;

    }.bind(this);

    this.parsers[4] = function(word, unpacked){
        //parse a type IV word
        //<word>: number; 32 bits corresponding to a type IV word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeIVPacketType'] = (word & 0xF0000000) >>> 28;
        unpacked['channelTriggerID'] = (word & 0x0FFFFFFF) >>> 0;
    }.bind(this);

    this.parsers[5] = function(word, unpacked){
        //parse a type V word
        //<word>: number; 32 bits corresponding to a type V word
        //<unpacked>: object; a key-value store for holding the unpacked results

        //slice up word
        unpacked['typeVPacketType']  = (word & 0xF0000000) >>> 28;
        unpacked['timestampLowBits'] = (word & 0x0FFFFFFF) >>> 0;
    }.bind(this);

    this.parsers[6] = function(word, unpacked){
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

    ///////////////////////
    // post-processing
    ///////////////////////

    this.reconstructTimestamp = function(unpacked){
        //<unpacked>: object; a key-value store for holding the unpacked results
        //recombine the timestamp from info in words V and VI

        unpacked.timestamp = (unpacked.timestampHighBits * Math.pow(2, 28)) + unpacked.timestampLowBits; //yes, adding - ok since bitshift, gets around JS sigining.
    }

}







