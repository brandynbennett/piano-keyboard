import generateKeys from 'piano-keyboard/utils/note-data';
import { module, test } from 'qunit';

module('Unit | Utility | note data.js', {
  beforeEach() {
    this.notes = generateKeys();
  },
});

test('Frequencies are correct', function(assert) {
  assert.expect(3);
  const NUM_DECIMALS = 2;

  // Use toFixed to account for rounding
  assert.equal(this.notes[0].frequency.toFixed(NUM_DECIMALS), '27.50', 'A0 is correct');
  assert.equal(this.notes[48].frequency.toFixed(NUM_DECIMALS), '440.00', 'A4 is correct');
  assert.equal(this.notes[87].frequency.toFixed(NUM_DECIMALS), '4186.01', 'C8 is correct');
});

test('Note names are correct', function(assert) {
  assert.expect(4);

  assert.equal(this.notes[0].noteName, 'A0', 'A0 is correct');
  assert.equal(this.notes[1].noteName, 'A#0/A♭0', 'A#0/A♭0 is correct');
  assert.equal(this.notes[58].noteName, 'G5', 'G5 is correct');
  assert.equal(this.notes[87].noteName, 'C8', 'C8 is correct');
});

test('Black notes are correct', function(assert) {
  assert.expect(5);

  assert.equal(this.notes[0].isBlack, false, 'A0 is correct');
  assert.equal(this.notes[1].isBlack, true, 'A#0/A♭0 is correct');
  assert.equal(this.notes[58].isBlack, false, 'G5 is correct');
  assert.equal(this.notes[49].isBlack, true, 'A#4/A♭4 is correct');
  assert.equal(this.notes[87].isBlack, false, 'C8 is correct');
});

test('Number in ocative is correct', function(assert) {
  assert.expect(4);

  assert.equal(this.notes[0].numberInOctave, 9, 'A0 is correct');
  assert.equal(this.notes[1].numberInOctave, 10, 'A#0/A♭0 is correct');
  assert.equal(this.notes[58].numberInOctave, 7, 'G5 is correct');
  assert.equal(this.notes[87].numberInOctave, 0, 'C8 is correct');
});

test('Note numbers are correct', function(assert) {
  assert.expect(4);

  assert.equal(this.notes[0].noteNumber, 1, 'A0 is correct');
  assert.equal(this.notes[1].noteNumber, 2, 'A#0/A♭0 is correct');
  assert.equal(this.notes[58].noteNumber, 59, 'G5 is correct');
  assert.equal(this.notes[87].noteNumber, 88, 'C8 is correct');
});
