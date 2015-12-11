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
                'id': 'channelTriggerCounterValue',
                'title': 'Channel Trigger Counter Value'
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
                'id': 'eventTrailerChannelTriggerCounterValue',
                'title': 'Repeat Channel Trigger Counter Value Low Bits'
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
    //parseGRIF16scalar(payload[0]);
    //parseGRIF4Gfragment(payload[0]);
    //parsePPG(payload[0]);
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
            document.getElementById(keys[i] + 'Hex').innerHTML = '0x'+unpacked[keys[i]][0].toString(16);
            document.getElementById(keys[i] + 'Parsed').innerHTML = unpacked[keys[i]].slice(-1)[0];
        }
    }

    //post-processing flags
    parser.postProcessingFlags(unpacked);

    //assemble flags and highlight problematic table entries
    flags = dataStore.GRIF16fragmentCompositionalFlags;
    keys = Object.keys(dataStore.GRIF16fragmentWordFlags)
    for(i=0; i<keys.length; i++){
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
        plotWaveform(unpacked['waveformSample']);
    } else {
        document.getElementById('grif16waveformWrap').classList.add('hidden');
    }

    //report raw event
    listRawEvent('rawGRIF16fragment',  payload)
}

function plotWaveform(wvfrm){
    //plot the reported waveform, described by array of values <wvfrm>.

    var data,
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
            plot_bgcolor: 'rgba(0,0,0,0)'
        }

    //construct the plotly data object
    data = [
        {
            y: wvfrm,
            type: 'scatter'
        }
    ]
    
    Plotly.newPlot('waveformPlot', data, layout);    
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