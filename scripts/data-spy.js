//////////////////////////////////
// template structure data
//////////////////////////////////

function defineGRIF16fragmentTableStructure(){
    //returns an array describing the table sections and entries, for use by the templater.

    var words = [];

    //define words + items for templating
    words[0] = {
        "label": 'I',
        "members": [
            {
                'id': 'typeIpacketType',
                'title': 'Type I Packet Type'
            },

            {
                'id': 'moduleType',
                'title': 'Module Type'
            },

            {
                'id': 'wordCount',
                'title': 'Word Count'
            },

            {
                'id': 'address',
                'title': 'Address'
            },

            {
                'id': 'detType',
                'title': 'Detector Type'
            }
        ]
    }

    words[1] = {
        "label": 'II',
        "members": [
            {
                'id': 'typeIIpacketType',
                'title': 'Type II Packet Type'
            },

            {
                'id': 'networkPacketCounterValue',
                'title': 'Network Packet Counter Value'
            }
        ]
    }

    words[2] = {
        "label": 'III',
        "members": [
            {
                'id': 'typeIIIhead',
                'title': 'Type III Packet Label'
            },

            {
                'id': 'filterPatterns',
                'title': 'Filter Patterns'
            },

            {
                'id': 'waveformIndicator',
                'title': 'Waveform Indicator'
            },

            {
                'id': 'reserved',
                'title': 'Reserved Bits'
            },

            {
                'id': 'pileupType',
                'title': 'Pileup Type'
            }

        ]
    }

    words[3] = {
        "label": 'IV',
        "members": [
            {
                'id': 'typeIVhead',
                'title': 'Type IV Packet Label'
            },

            {
                'id': 'filterConditionCounterValue',
                'title': 'Filter Condition Counter Value'
            }
        ]
    }

    words[4] = {
        "label": 'V',
        "members": [
            {
                'id': 'typeVPacketType',
                'title': 'Type V Packet Type'
            },

            {
                'id': 'channelAcceptedHitCounter',
                'title': 'Channel Accepted Hit Counter'
            }
        ]
    }

    words[5] = {
        "label": 'VI',
        "members": [
            {
                'id': 'typeVIPacketType',
                'title': 'Type VI Packet Type'
            },

            {
                'id': 'timestampLowBits',
                'title': 'Timestamp Low Bits'
            }
        ]
    }

    words[6] = {
        "label": 'VII',
        "members": [
            {
                'id': 'typeVIIPacketType',
                'title': 'Type VII Packet Type'
            },

            {
                'id': 'deadtime',
                'title': 'Deadtime'
            },

            {
                'id': 'timestampHighBits',
                'title': 'Timestamp High Bits'
            }
        ]
    }

    // words[7] = {
    //     "label": 'VIIa',
    //     "members": [
    //         {
    //             'id': 'typeVIIaPacketType',
    //             'title': 'Type VIIa Packet Type'
    //         },

    //         {
    //             'id': 'waveformSample',
    //             'title': 'Waveform Sample'
    //         }
    //     ]
    // }

    words[7] = {
        "label": 'VIII',
        "members": [
            {
                'id': 'typeVIIIhead',
                'title': 'Type VIII Packet Label'
            },

            {
                'id': 'upperIntLength',
                'title': 'Upper Integration Length'
            },

            {
                'id': 'pulseHeight',
                'title': 'Pulse Height'
            }
        ]
    }

    words[8] = {
        "label": 'IX',
        "members": [
            {
                'id': 'typeIXhead',
                'title': 'Type IX Packet Label'
            },

            {
                'id': 'lowerIntLength',
                'title': 'Lower Integration Length'
            },

            {
                'id': 'CFD',
                'title': 'CFD'
            }
        ]
    }

    words[9] = {
        "label": 'X',
        "members": [
            {
                'id': 'typeXpacketType',
                'title': 'Type X Packet Type'
            },

            {
                'id': 'channelAcceptedCounterValue',
                'title': 'Channel Accepted Counter Value'
            },

            {
                'id': 'eventTrailerChannelAcceptedHitCounter',
                'title': 'Repeat Channel Accepted Hit Counter Low Bits'
            }
        ]
    }

    return words

}

function defineGRIF4GfragmentTableStructure(){
    //returns an array describing the table sections and entries, for use by the templater.

    var words = [];

    //define words + items for templating
    words[0] = {
        "label": 'I',
        "members": [
            {
                'id': 'typeIpacketType',
                'title': 'Type I Packet Type'
            },

            {
                'id': 'moduleType',
                'title': 'Module Type'
            },

            {
                'id': 'wordCount',
                'title': 'Word Count'
            },

            {
                'id': 'address',
                'title': 'Address'
            },

            {
                'id': 'detType',
                'title': 'Detector Type'
            }
        ]
    }

    words[1] = {
        "label": 'II',
        "members": [
            {
                'id': 'typeIIpacketType',
                'title': 'Type II Packet Type'
            },

            {
                'id': 'networkPacketCounterValue',
                'title': 'Network Packet Counter Value'
            }
        ]
    }

    words[2] = {
        "label": 'III',
        "members": [
            {
                'id': 'typeIIIhead',
                'title': 'Type III Packet Label'
            },

            {
                'id': 'filterPatterns',
                'title': 'Filter Patterns'
            },

            {
                'id': 'waveformIndicator',
                'title': 'Waveform Indicator'
            },

            {
                'id': 'reserved',
                'title': 'Reserved Bits'
            }
        ]
    }

    words[3] = {
        "label": 'IV',
        "members": [
            {
                'id': 'typeIVhead',
                'title': 'Type IV Packet Label'
            },

            {
                'id': 'filterConditionCounterValue',
                'title': 'Filter Condition Counter Value'
            }
        ]
    }

    words[4] = {
        "label": 'V',
        "members": [
            {
                'id': 'typeVPacketType',
                'title': 'Type V Packet Type'
            },

            {
                'id': 'channelAcceptedHitCounter',
                'title': 'Channel Accepted Hit Counter'
            }
        ]
    }

    words[5] = {
        "label": 'VI',
        "members": [
            {
                'id': 'typeVIPacketType',
                'title': 'Type VI Packet Type'
            },

            {
                'id': 'timestampLowBits',
                'title': 'Timestamp Low Bits'
            }
        ]
    }

    words[6] = {
        "label": 'VII',
        "members": [
            {
                'id': 'typeVIIPacketType',
                'title': 'Type VII Packet Type'
            },

            {
                'id': 'deadtime',
                'title': 'Deadtime'
            },

            {
                'id': 'timestampHighBits',
                'title': 'Timestamp High Bits'
            }
        ]
    }

    // words[7] = {
    //     "label": 'VIIa',
    //     "members": [
    //         {
    //             'id': 'typeVIIaPacketType',
    //             'title': 'Type VIIa Packet Type'
    //         },

    //         {
    //             'id': 'waveformSample',
    //             'title': 'Waveform Sample'
    //         }
    //     ]
    // }

    words[7] = {
        "label": 'VIII',
        "members": [
            {
                'id': 'typeVIIIhead',
                'title': 'Type VIII Packet Label'
            },

            {
                'id': 'upperIntLength',
                'title': 'Upper Integration Length'
            },

            {
                'id': 'pulseHeight',
                'title': 'Pulse Height'
            }
        ]
    }

    words[8] = {
        "label": 'IX',
        "members": [
            {
                'id': 'typeIXhead',
                'title': 'Type IX Packet Label'
            },

            {
                'id': 'lowerIntLength',
                'title': 'Lower Integration Length'
            },

            {
                'id': 'CFD',
                'title': 'CFD'
            }
        ]
    }

    words[9] = {
        "label": 'X',
        "members": [
            {
                'id': 'typeXhead',
                'title': 'Type X Packet Label'
            },

            {
                'id': 'upperLongIntLength',
                'title': 'Upper Long Integration Length'
            },

            {
                'id': 'shortChargeIntegration',
                'title': 'Short Charge Integration'
            }
        ]
    }

    words[10] = {
        "label": 'XI',
        "members": [
            {
                'id': 'typeXIhead',
                'title': 'Type XI Packet Label'
            },

            {
                'id': 'lowerLongIntLength',
                'title': 'Lower Long Integration Length'
            },

            {
                'id': 'zeroCrossingTime',
                'title': 'Zero-Crossing Time'
            }
        ]
    }

    words[11] = {
        "label": 'XII',
        "members": [
            {
                'id': 'typeXIIpacketType',
                'title': 'Type XII Packet Type'
            },

            {
                'id': 'channelAcceptedCounterValue',
                'title': 'Channel Accepted Counter Value'
            },

            {
                'id': 'eventTrailerChannelAcceptedHitCounter',
                'title': 'Repeat Channel Accepted Hit Counter Low Bits'
            }
        ]
    }

    return words

}

function definePPGtableStructure(){
    //returns an array describing the table sections and entries, for use by the templater.

    var words = [];

    //define words + items for templating
    words[0] = {
        "label": 'I',
        "members": [
            {
                'id': 'typeIpacketType',
                'title': 'Type I Packet Type'
            },

            {
                'id': 'moduleType',
                'title': 'Module Type'
            },

            {
                'id': 'wordCount',
                'title': 'Word Count'
            },

            {
                'id': 'address',
                'title': 'Address'
            },

            {
                'id': 'detType',
                'title': 'Detector Type'
            }
        ]
    }

    words[1] = {
        "label": 'II',
        "members": [
            {
                'id': 'typeIIpacketType',
                'title': 'Type II Packet Type'
            },

            {
                'id': 'networkPacketCounterValue',
                'title': 'Network Packet Counter Value'
            }
        ]
    }

    words[2] = {
        "label": 'III',
        "members": [
            {
                'id': 'typeIIIpacketType',
                'title': 'Type III Packet Type'
            },

            {
                'id': 'expectedPPGpattern',
                'title': 'Expected PPG Pattern'
            }

        ]
    }

    words[3] = {
        "label": 'IV',
        "members": [
            {
                'id': 'typeIVpacketType',
                'title': 'Type IV Packet Type'
            },

            {
                'id': 'confirmedPPGpattern',
                'title': 'Confirmed PPG Pattern'
            }
        ]
    }

    words[4] = {
        "label": 'V',
        "members": [
            {
                'id': 'typeVpacketType',
                'title': 'Type V Packet Type'
            },

            {
                'id': 'timestampLowBits',
                'title': 'Timestamp Low Bits'
            }
        ]
    }

    words[5] = {
        "label": 'VI',
        "members": [
            {
                'id': 'typeVIpacketType',
                'title': 'Type VI Packet Type'
            },

            {
                'id': 'timestampHighBits',
                'title': 'Timestamp High Bits'
            }
        ]
    }

    words[6] = {
        "label": 'VII',
        "members": [
            {
                'id': 'typeVIIpacketType',
                'title': 'Type VII Packet Type'
            },

            {
                'id': 'previousPPGpattern',
                'title': 'Previous PPG Pattern'
            }
        ]
    }

    return words

}

function defineScalerTableStructure(){
    //returns an array describing the table sections and entries, for use by the templater.

    var words = [];

    //define words + items for templating
    words[0] = {
        "label": 'I',
        "members": [
            {
                'id': 'typeIpacketType',
                'title': 'Type I Packet Type'
            },

            {
                'id': 'moduleType',
                'title': 'Module Type'
            },

            {
                'id': 'wordCount',
                'title': 'Word Count'
            },

            {
                'id': 'address',
                'title': 'Address'
            },

            {
                'id': 'detType',
                'title': 'Detector Type'
            }
        ]
    }

    words[1] = {
        "label": 'II',
        "members": [
            {
                'id': 'typeIIpacketType',
                'title': 'Type II Packet Type'
            },

            {
                'id': 'networkPacketCounterValue',
                'title': 'Network Packet Counter Value'
            }
        ]
    }

    words[2] = {
        "label": 'III',
        "members": [
            {
                'id': 'typeIIIpacketType',
                'title': 'Type III Packet Type'
            },

            {
                'id': 'timestampLowBits',
                'title': 'Time Stamp Low Bits'
            }

        ]
    }

    words[3] = {
        "label": 'IV',
        "members": [
            {
                'id': 'scalerValue',
                'title': 'Scaler Values'
            }
        ]
    }

    words[4] = {
        "label": 'V',
        "members": [
            {
                'id': 'typeVpacketType',
                'title': 'Type V Packet Type'
            },

            {
                'id': 'scalerType',
                'title': 'Scaler Type'
            },

            {
                'id': 'timestampHighBits',
                'title': 'Timestamp High Bits'
            },

            {
                'id': 'repeatedTimeStampLowBits',
                'title': 'Repeated Timestamp Low Bits'
            }
        ]
    }

    return words

}

///////////////////////////
// parsing handlers
///////////////////////////

function parseODB(payload){
    //take the events from the odb, packed as payload = [grif16 fragment, grif16 scalar, grif 4g fragment, ppg], and unpack them.

    parseGRIF16fragment(payload[0]);
    parseScaler(payload[1]);
    parseGRIF4Gfragment(payload[2]);
    parsePPG(payload[3]);
}

function parseGRIF16fragment(payload){
    
    var parser = new GRIF16fragmentParser,
        flags, unpacked,
        warnings = document.getElementById('warningsDiv'),
        warningsData = {},
        i, keys;

    //assess composition of event
    parser.assessComposition(payload);

    //fill out table
    unpacked = parser.unpackAll(payload);
    keys = Object.keys(unpacked);
    for(i=0; i<keys.length; i++){
        if(document.getElementById(keys[i] + 'Parsed')){
            if(typeof unpacked[keys[i]][0] == 'number'){
                document.getElementById(keys[i] + 'Hex').innerHTML = '0x'+unpacked[keys[i]][0].toString(16);
                document.getElementById(keys[i] + 'Parsed').innerHTML = unpacked[keys[i]].slice(-1)[0];
            } else{
                rawSeries = '';
                parsedSeries = '';
                for(j=0; j<unpacked[keys[i]].length; j++){
                    rawSeries += '0x'+unpacked[keys[i]][j][0].toString(16) + '<br>'
                    parsedSeries += unpacked[keys[i]][j].slice(-1)[0] + '<br>';
                }
                document.getElementById(keys[i] + 'Hex').innerHTML = rawSeries;
                document.getElementById(keys[i] + 'Parsed').innerHTML = parsedSeries;
            }
        }
    }

    //post-processing flags
    parser.postProcessingFlags(unpacked);

    //assemble flags and highlight problematic table entries
    flags = dataStore.GRIF16fragmentCompositionalFlags;
    keys = Object.keys(dataStore.GRIF16fragmentWordFlags)
    for(i=0; i<keys.length; i++){
        if(dataStore.GRIF16fragmentWordFlags[keys[i]] != '')    
            flags = flags.concat(dataStore.GRIF16fragmentWordFlags[keys[i]]);
        document.getElementById(keys[i]).parentNode.setAttribute('style', 'background-color: #FF0000');
    }

    //raise warnings as necessary
    if(flags.length == 0){
        warningsData.good = true;
        warnings.classList.remove('raised');
        warnings.classList.add('ok');
    } else {
        warningsData.bad = {
            "warnings" : flags
        }
        warnings.classList.remove('ok');
        warnings.classList.add('raised');
    }

    warnings.innerHTML = Mustache.to_html(
            dataStore.partials.warningsList,
            warningsData
        )

    //report reconstructed values
    document.getElementById('grif16fragmentTimestamp').innerHTML = 'Timestamp: ' + unpacked.timestamp[1];
    document.getElementById('grif16fragmentIntegrationLength').innerHTML = 'Integration Length: ' + unpacked.integrationLength[0];

    //generate waveform plot if needed:
    if(dataStore.GRIF16fragmentDetails.nTypeVIIa > 0){
        plotWaveform(unpacked['waveformSample'], 'waveformPlot');
    } else {
        document.getElementById('grif16waveformWrap').classList.add('hidden');
    }

    //report raw event
    listRawEvent('rawGRIF16fragment',  payload)
}

function parseGRIF4Gfragment(payload){
    
    var parser = new GRIF4GfragmentParser,
        flags, unpacked,
        warnings = document.getElementById('warningsDiv4G'),
        warningsData = {},
        i, keys;

    //assess composition of event
    parser.assessComposition(payload);

    //fill out table
    unpacked = parser.unpackAll(payload);
    keys = Object.keys(unpacked);
    for(i=0; i<keys.length; i++){
        if(document.getElementById(keys[i] + '4GParsed')){
            if(typeof unpacked[keys[i]][0] == 'number'){
                document.getElementById(keys[i] + '4GHex').innerHTML = '0x'+unpacked[keys[i]][0].toString(16);
                document.getElementById(keys[i] + '4GParsed').innerHTML = unpacked[keys[i]].slice(-1)[0];
            } else{
                rawSeries = '';
                parsedSeries = '';
                for(j=0; j<unpacked[keys[i]].length; j++){
                    rawSeries += '0x'+unpacked[keys[i]][j][0].toString(16) + '<br>'
                    parsedSeries += unpacked[keys[i]][j].slice(-1)[0] + '<br>';
                }
                document.getElementById(keys[i] + '4GHex').innerHTML = rawSeries;
                document.getElementById(keys[i] + '4GParsed').innerHTML = parsedSeries;
            }
        }
    }

    //post-processing flags
    parser.postProcessingFlags(unpacked);

    //assemble flags and highlight problematic table entries
    flags = dataStore.GRIF4GfragmentCompositionalFlags;
    keys = Object.keys(dataStore.GRIF4GfragmentWordFlags)
    for(i=0; i<keys.length; i++){
        if(dataStore.GRIF4GfragmentWordFlags[keys[i]] != '')    
            flags = flags.concat(dataStore.GRIF4GfragmentWordFlags[keys[i]]);
        document.getElementById(keys[i]+'4G').parentNode.setAttribute('style', 'background-color: #FF0000');
    }

    //raise warnings as necessary
    if(flags.length == 0){
        warningsData.good = true;
        warnings.classList.remove('raised');
        warnings.classList.add('ok');
    } else {
        warningsData.bad = {
            "warnings" : flags
        }
        warnings.classList.remove('ok');
        warnings.classList.add('raised');
    }

    warnings.innerHTML = Mustache.to_html(
            dataStore.partials.warningsList,
            warningsData
        )

    //report reconstructed values
    document.getElementById('grif4GfragmentTimestamp').innerHTML = 'Timestamp: ' + unpacked.timestamp[1];
    document.getElementById('grif4GfragmentIntegrationLength').innerHTML = 'Integration Length: ' + unpacked.integrationLength[0];
    document.getElementById('grif4GfragmentLongIntegrationLength').innerHTML = 'Long Integration Length: ' + unpacked.longIntegrationLength[0];

    //generate waveform plot if needed:
    if(dataStore.GRIF4GfragmentDetails.nTypeVIIa > 0){
        plotWaveform(unpacked['waveformSample'], 'waveformPlot4G');
    } else {
        document.getElementById('grif4GwaveformWrap').classList.add('hidden');
    }

    //report raw event
    listRawEvent('rawGRIF4Gfragment',  payload)
}

function parsePPG(payload){
    
    var parser = new PPGparser,
        flags, unpacked,
        warnings = document.getElementById('warningsDivPPG'),
        warningsData = {},
        i, keys;

    //assess composition of event
    parser.assessComposition(payload);

    //fill out table
    unpacked = parser.unpackAll(payload);
    keys = Object.keys(unpacked);
    for(i=0; i<keys.length; i++){
        if(document.getElementById(keys[i] + 'PPGParsed')){
            if(typeof unpacked[keys[i]][0] == 'number'){
                document.getElementById(keys[i] + 'PPGHex').innerHTML = '0x'+unpacked[keys[i]][0].toString(16);
                document.getElementById(keys[i] + 'PPGParsed').innerHTML = unpacked[keys[i]].slice(-1)[0];
            } else{
                rawSeries = '';
                parsedSeries = '';
                for(j=0; j<unpacked[keys[i]].length; j++){
                    rawSeries += '0x'+unpacked[keys[i]][j][0].toString(16) + '<br>'
                    parsedSeries += unpacked[keys[i]][j].slice(-1)[0] + '<br>';
                }
                document.getElementById(keys[i] + 'PPGHex').innerHTML = rawSeries;
                document.getElementById(keys[i] + 'PPGParsed').innerHTML = parsedSeries;
            }
        }
    }

    //post-processing flags
    parser.postProcessingFlags(unpacked);

    //assemble flags and highlight problematic table entries
    flags = dataStore.PPGcompositionalFlags;
    keys = Object.keys(dataStore.PPGwordFlags)
    for(i=0; i<keys.length; i++){
        flags = flags.concat(dataStore.PPGwordFlags[keys[i]]);
        document.getElementById(keys[i]+'4G').parentNode.setAttribute('style', 'background-color: #FF0000');
    }

    //raise warnings as necessary
    if(flags.length == 0){
        warningsData.good = true;
        warnings.classList.remove('raised');
        warnings.classList.add('ok');
    } else {
        warningsData.bad = {
            "warnings" : flags
        }
        warnings.classList.remove('ok');
        warnings.classList.add('raised');
    }

    warnings.innerHTML = Mustache.to_html(
            dataStore.partials.warningsList,
            warningsData
        )

    //report reconstructed values
    document.getElementById('PPGtimestamp').innerHTML = 'Timestamp: ' + unpacked.timestamp[1];

    //report raw event
    listRawEvent('rawPPG',  payload)
}

function parseScaler(payload){
    
    var parser = new scalerParser,
        flags, unpacked,
        warnings = document.getElementById('warningsDivScaler'),
        warningsData = {},
        i, j, rawSeries, parsedSeries, keys;

    //assess composition of event
    parser.assessComposition(payload);

    //fill out table
    unpacked = parser.unpackAll(payload);
    keys = Object.keys(unpacked);
    for(i=0; i<keys.length; i++){
        if(document.getElementById(keys[i] + 'ScalerParsed')){
            if(typeof unpacked[keys[i]][0] == 'number'){
                document.getElementById(keys[i] + 'ScalerHex').innerHTML = '0x'+unpacked[keys[i]][0].toString(16);
                document.getElementById(keys[i] + 'ScalerParsed').innerHTML = unpacked[keys[i]].slice(-1)[0];
            } else{
                rawSeries = '';
                parsedSeries = '';
                for(j=0; j<unpacked[keys[i]].length; j++){
                    rawSeries += '0x'+unpacked[keys[i]][j][0].toString(16) + '<br>'
                    parsedSeries += unpacked[keys[i]][j].slice(-1)[0] + '<br>';
                }
                document.getElementById(keys[i] + 'ScalerHex').innerHTML = rawSeries;
                document.getElementById(keys[i] + 'ScalerParsed').innerHTML = parsedSeries;
            }
        }
    }

    //post-processing flags
    parser.postProcessingFlags(unpacked);

    //assemble flags and highlight problematic table entries
    flags = dataStore.scalerCompositionalFlags;
    keys = Object.keys(dataStore.scalerWordFlags)
    for(i=0; i<keys.length; i++){
        flags = flags.concat(dataStore.scalerWordFlags[keys[i]]);
        document.getElementById(keys[i]+'Scaler').parentNode.setAttribute('style', 'background-color: #FF0000');
    }

    //raise warnings as necessary
    if(flags.length == 0){
        warningsData.good = true;
        warnings.classList.remove('raised');
        warnings.classList.add('ok');
    } else {
        warningsData.bad = {
            "warnings" : flags
        }
        warnings.classList.remove('ok');
        warnings.classList.add('raised');
    }

    warnings.innerHTML = Mustache.to_html(
            dataStore.partials.warningsList,
            warningsData
        )

    //report reconstructed values
    document.getElementById('scalerTimestamp').innerHTML = 'Timestamp: ' + unpacked.timestamp[1];

    //report raw event
    listRawEvent('rawScaler',  payload)
}

function plotWaveform(wvfrm, divID){
    //plot the reported waveform, described by array of values <wvfrm>.

    var data,
        dim = document.getElementById('waveformPlot').offsetWidth;
        layout = {
            xaxis:{
                zerolinecolor: '#999999',
                gridcolor: '#999999',
                tickfont:{
                    color: '#999999'
                }
            },
            yaxis:{
                title: 'Waveform',
                zerolinecolor: '#999999',
                gridcolor: '#999999',
                tickfont:{
                    color: '#999999'
                },
                titlefont:{
                    color: '#999999'
                }
            },
            paper_bgcolor: 'rgba(0,0,0,0)',
            plot_bgcolor: 'rgba(0,0,0,0)',
            autosize: false,
            width: dim,
            height: dim
        }

    //construct the plotly data object
    data = [
        {
            y: wvfrm,
            type: 'scatter'
        }
    ]
    
    Plotly.newPlot(divID, data, layout);    
}


//////////////////
// helpers
//////////////////

function listRawEvent(listID, words){
    //generate the html for listing a raw event

    var i,
        list = document.getElementById(listID),
        item;

    for(i=0; i<words.length; i++){
        item = document.createElement('li')
        item.innerHTML = '0x'+alwaysThisLong(words[i].toString(16),8);
        list.appendChild(item);
    }
}

function alwaysThisLong(str, length){
    //pad string with leading 0's to make it the requested length

    var pad = length - str.length,
        i, 
        padded = str;

    for(i=0; i<pad; i++){
        padded = '0' + padded
    }

    return padded;
}

function manageView(viewID){
    //show this event type and hide the previous

    document.getElementById(dataStore.currentViewID).classList.add('hidden');
    document.getElementById(viewID).classList.remove('hidden');
    dataStore.currentViewID = viewID;

}

function promisePartial(name){
    // promise to get tempate <name>; thanks http://www.html5rocks.com/en/tutorials/es6/promises/
    var rootURL, path;

    rootURL = window.location.protocol + "//" + window.location.host;
    path = window.location.pathname.split('/').slice(0,-1);
    for(i=0; i<path.length; i++){
        rootURL += path[i] + '/'
    }

    url = rootURL + 'partials/' + name + '.mustache';

    // Return a new promise.
    return new Promise(function(resolve, reject) {
        // Do the usual XHR stuff
        var req = new XMLHttpRequest();
        req.open('GET', url);

        req.onload = function() {
            // This is called even on 404 etc
            // so check the status
            if (req.status == 200) {
                // Resolve the promise with the response text
                resolve(req.response);
            }
            else {
                // Otherwise reject with the status text
                // which will hopefully be a meaningful error
                reject(Error(req.statusText));
            }
        };

        // Handle network errors
        req.onerror = function() {
            reject(Error("Network Error"));
        };

        // Make the request
        req.send();
    });
}

function promiseScript(url){
    //<url>: string; AJAX request to the ODB.
    //returns a promise to return the result of the requested url; does the JSONP/script tag dance.

    // Return a new promise.
    return new Promise(function(resolve, reject) {

        var script = document.createElement('script');

        script.setAttribute('src', url);
        script.onload = function(){
            deleteNode('promiseScript');
            resolve(null); 
        }
        script.onerror = function(){
            console.log('script failure')
        }
        script.id = 'promiseScript';
        document.head.appendChild(script);
    });
}

function deleteNode(id){
    //delete a dom node with id
    //thanks https://developer.mozilla.org/en-US/docs/Web/API/Node/removeChild
    var node = document.getElementById(id);
    if (node.parentNode) {
        node.parentNode.removeChild(node);
    }
}