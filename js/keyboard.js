var whiteKeyColor = getComputedStyle(document.documentElement).getPropertyValue('--white-key-color');
var blackKeyColor = getComputedStyle(document.documentElement).getPropertyValue('--black-key-color');
var orange = getComputedStyle(document.documentElement).getPropertyValue('--orange');
var darkGreen = getComputedStyle(document.documentElement).getPropertyValue('--dark-green');
var octaveStart = 1;
var octaveEnd = 7;

var labels = false;

function renderKeyboard() {
	let container = document.getElementById('keyboard');
	container.innerHTML = '';

	var whiteCount = 0;
	var whiteTotal = 0;
	var blackCount = 0;
	var notesToRender = [];
	var midiMappingOffset = 21;
	var padding = window.innerWidth/30;

	for (var octave = octaveStart; octave < octaveEnd; octave++) {
		notes.forEach(note => {
			var noteObject = Object.assign({}, note);
			var midiValue = midiMappingOffset + octave * 12 + noteObject.position;
			noteObject.mapping = `${noteObject.mapping}${octave}`;
			noteObject.midiValue = midiMappingOffset + octave * 12 + noteObject.position;

			if (noteObject.color == 'W') {
				whiteTotal++;
			}

			if (octave == octaveEnd - 1) {
				if (noteObject.position <= 3) {
					notesToRender.push(noteObject);
				}
			}
			else {
				notesToRender.push(noteObject);
			}
		});
	}

	var whiteKeyWidth = Math.round((window.innerWidth - padding) / whiteTotal);
	var blackKeyWidth = whiteKeyWidth - 10;

	document.documentElement.style.setProperty('--white-key-width', `${whiteKeyWidth}px`);
	document.documentElement.style.setProperty('--black-key-width', `${blackKeyWidth}px`);

	notesToRender.forEach(note => {
		var key = document.createElement('div');
		var position;
		if (note.color == 'B') {
			key.className = 'black key';
			position = (whiteKeyWidth * (whiteCount - 1)) + (whiteKeyWidth - blackKeyWidth / 2);
		} else {
			key.className = 'white key';
			position = whiteKeyWidth * whiteCount;
			whiteCount++;
		}

		key.id = note.midiValue;
		key.dataset.mapping = note.mapping;
		key.style.left = `${position}px`;

		if (note.midiValue == 60) {
			var label = document.createElement('div');
			label.className = 'middle-c label';
			label.innerHTML = '&middot';
			key.appendChild(label);
		}

		if (labels) {
			var label = document.createElement('div');
			if (note['color'] == 'B') {
				label.className = 'black label';
			} else {
				label.className = 'white label';
			}
			
			var text;
			if (note.names.length > 1) {
				text = `${note.names[0]}<br>${note.names[1]}`;
			} else {
				text = note.names;
			}

			label.innerHTML = text;
			key.appendChild(label);
		}

		container.appendChild(key);
	});

	var keyboardWidth = whiteCount * whiteKeyWidth;
	container.style.width = `${keyboardWidth}px`;
}

// TODO: Fix hovering bug
function toggleNoteNames(object){
	var background = document.getElementById('names-button');
	if (object.dataset.value == '0') {
		object.dataset.value = '1';
		labels = true;
		background.style.color = darkGreen;
	}
	else {
		object.dataset.value = '0';
		labels = false;
		background.style.color = orange;
	}
	renderKeyboard();
}

function startingOctaveDown() {
	if (octaveStart > 0) {
		if (octaveEnd - octaveStart > 0) {
			octaveStart--;
			renderKeyboard();
		}
	}
}

function startingOctaveUp() {
	if (octaveStart < octaveEnd - 1) {
		if (octaveEnd - octaveStart > 0) {
			octaveStart++;
			renderKeyboard();
		}
	}
}

function endingOctaveDown() {
	if (octaveStart < octaveEnd - 1) {
		if (octaveEnd - octaveStart > 0) {
			octaveEnd--;
			renderKeyboard();
		}
	}
}

function endingOctaveUp() {
	if (octaveEnd < 8) {
		if (octaveEnd - octaveStart > 0) {
			octaveEnd++;
			renderKeyboard();
		}
	}
}

function resetOctaves() {
	octaveStart = 1;
	octaveEnd = 7;
	renderKeyboard();
}
