function main() {
	if (navigator.requestMIDIAccess) {
	    console.log('This browser supports WebMIDI!');
	    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);

	} else {
		alert('Your browser does not support MIDI.');
	    console.log('WebMIDI is not supported in this browser.');
	}

	renderKeyboard();
}

document.addEventListener('DOMContentLoaded', main, false);
