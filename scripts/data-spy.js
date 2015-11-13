function defineTableStructure(){
    //returns an array describing the table sections and entries, for use by the templater.

    var words = [];

    //define words + items for templating
    words[0] = {
        "label": 'I',
        "members": [
            {
                'id': 'packetType',
                'title': 'Type I Packet Label'
            },

            {
                'id': 'pileUpType',
                'title': 'Pile Up Type'
            },

            {
                'id': 'dataType',
                'title': 'Data Type'
            },

            {
                'id': 'numFilterPatterns',
                'title': 'No. Filter Patterns'
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
                'id': 'typeIIhead',
                'title': 'Type II Packet Label'
            },

            {
                'id': 'masterFilterPatternsPassed',
                'title': 'Master Filter Patterns Passed'
            },

            {
                'id': 'PPGpattern',
                'title': 'PPG Pattern'
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
                'id': 'masterFilterID',
                'title': 'Master Filter ID'
            }
        ]
    }

    words[3] = {
        "label": 'IV',
        "members": [
            {
                'id': 'typeIVPacketType',
                'title': 'Type IV Packet Label'
            },

            {
                'id': 'channelTriggerID',
                'title': 'Channel Trigger ID'
            }
        ]
    }

    words[4] = {
        "label": 'V',
        "members": [
            {
                'id': 'typeVPacketType',
                'title': 'Type V Packet Label'
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
                'id': 'typeVIPacketType',
                'title': 'Type VI Packet Label'
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

    words[6] = {
        "label": 'VIa',
        "members": [
            {
                'id': 'typeVIaPacketType',
                'title': 'Type VIa Packet Label'
            },

            {
                'id': 'networkPacketID',
                'title': 'Network Packet ID'
            }
        ]
    }

    words[7] = {
        "label": 'VIb',
        "members": [
            {
                'id': 'typeVIbPacketType',
                'title': 'Type VIb Packet Label'
            },

            {
                'id': 'waveformSample',
                'title': 'Waveform Sample'
            }
        ]
    }

    words[8] = {
        "label": 'VII',
        "members": [
            {
                'id': 'typeVIIhead',
                'title': 'Type VII Packet Label'
            },

            {
                'id': 'K1upper',
                'title': 'K1 Upper Bits'
            },

            {
                'id': 'K1pulseHeight',
                'title': 'K1 Pulse Height'
            }
        ]
    }

    words[9] = {
        "label": 'VIII',
        "members": [
            {
                'id': 'typeVIIIhead',
                'title': 'Type VIII Packet Label'
            },

            {
                'id': 'K1lower',
                'title': 'K1 Lower Bits'
            },

            {
                'id': 'K1ampCorrectedTiming',
                'title': 'K1 Amplitude Corrected Timing'
            }
        ]
    }

    words[10] = {
        "label": 'IX',
        "members": [
            {
                'id': 'typeIXhead',
                'title': 'Type IX Packet Label'
            },

            {
                'id': 'K2upper',
                'title': 'K2 Upper Bits'
            },

            {
                'id': 'K2pulseHeight',
                'title': 'K2 Pulse Height'
            }
        ]
    }

    words[11] = {
        "label": 'X',
        "members": [
            {
                'id': 'typeXhead',
                'title': 'Type X Packet Label'
            },

            {
                'id': 'K2lower',
                'title': 'K2 Lower Bits'
            },

            {
                'id': 'K2ampCorrectedTiming',
                'title': 'K2 Amplitude Corrected Timing'
            }
        ]
    }

    words[12] = {
        "label": 'XI',
        "members": [
            {
                'id': 'typeXIhead',
                'title': 'Type XI Packet Label'
            },

            {
                'id': 'K3upper',
                'title': 'K3 Upper Bits'
            },

            {
                'id': 'K3pulseHeight',
                'title': 'K3 Pulse Height'
            }
        ]
    }

    words[13] = {
        "label": 'XII',
        "members": [
            {
                'id': 'typeXIIhead',
                'title': 'Type XII Packet Label'
            },

            {
                'id': 'K3lower',
                'title': 'K3 Lower Bits'
            },

            {
                'id': 'K3ampCorrectedTiming',
                'title': 'K3 Amplitude Corrected Timing'
            }
        ]
    }

    words[14] = {
        "label": 'XIII',
        "members": []
    }

    return words

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

function parseODB(payload){
    
    var parser = new GRIFFINparser,
        flags, unpacked,
        warnings = document.getElementById('warningsDiv'),
        warningsData = {},
        keys;

    //assess & report composition of event
    flags = parser.assessComposition(payload);

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

    //fill out table
    unpacked = parser.unpackAll(payload);
    keys = Object.keys(unpacked);
    for(i=0; i<keys.length; i++){
        if(document.getElementById(keys[i] + 'Parsed')){
            document.getElementById(keys[i] + 'Parsed').innerHTML = unpacked[keys[i]];
        }
    }


}