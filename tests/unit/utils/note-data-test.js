import noteData from 'piano-keyboard/utils/note-data';
import { module, test } from 'qunit';

module('Unit | Utility | note data.js');

test('Frequencies are correct', function(assert) {
  assert.expect(3);
  let notes = noteData;
  const NUM_DECIMALS = 2;

  // Use toFixed to account for rounding
  assert.equal(notes[0].frequency.toFixed(NUM_DECIMALS), '27.50', 'A0 is correct');
  assert.equal(notes[48].frequency.toFixed(NUM_DECIMALS), '440.00', 'A4 is correct');
  assert.equal(notes[87].frequency.toFixed(NUM_DECIMALS), '4186.01', 'C8 is correct');
});

test('Note names are correct', function(assert) {
  assert.expect(4);
  let notes = noteData;

  assert.equal(notes[0].noteName, 'A0', 'A0 is correct');
  assert.equal(notes[1].noteName, 'A#0/A♭0', 'A#0/A♭0 is correct');
  assert.equal(notes[58].noteName, 'G5', 'G5 is correct');
  assert.equal(notes[87].noteName, 'C8', 'C8 is correct');
});

test('Black notes are correct', function(assert) {
  assert.expect(5);
  let notes = noteData;
  console.log(noteData);

  assert.equal(notes[0].isBlack, false, 'A0 is correct');
  assert.equal(notes[1].isBlack, true, 'A#0/A♭0 is correct');
  assert.equal(notes[58].isBlack, false, 'G5 is correct');
  assert.equal(notes[49].isBlack, true, 'A#4/A♭4 is correct');
  assert.equal(notes[87].isBlack, false, 'C8 is correct');
});
