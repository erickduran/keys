function onMIDISuccess(midiAccess) {
    var inputs = midiAccess.inputs;

    if (inputs.size < 1) {
    	alert('No MIDI devices detected');
    	console.log('No MIDI input devices detected');
    }

    for (var input of midiAccess.inputs.values()) {
        input.onmidimessage = processMIDIEvent;
    }
}

function onMIDIFailure() {
	alert('Could not access MIDI devices.');
    console.log('Error: Could not access MIDI devices.');
}

function processMIDIEvent(message) {
    var command = message.data[0];
    var note = message.data[1];
    var velocity = (message.data.length > 2) ? message.data[2] : 0;

    switch (command) {
        case 144: 
    		var key = document.getElementById(note);
    		if (key != null) {
    			if (velocity > 0) {
	                key.style.backgroundColor = '#A0D0F8';
	            } else {
	            	if (key.className == 'black key') {
	            		key.style.backgroundColor = blackKeyColor;
	            	}
	            	else {
	            		key.style.backgroundColor = whiteKeyColor;
	            	}
	            }
    		}
        	break;
        case 128:
    		var key = document.getElementById(note);
    		if (key != null) {
    			if (key.className == 'black key') {
            		key.style.backgroundColor = blackKeyColor;
            	}
            	else {
            		key.style.backgroundColor = whiteKeyColor;
            	}
    		}
            break;
    }
}