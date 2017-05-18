const { pow, round } = Math;

export const MAX_KEYS = 88;

const NOTE_NAMES = ['C', 'C#/D♭', 'D', 'D#/E♭', 'E', 'F', 'F#/G♭', 'G', 'G#/A♭', 'A', 'A#/A♭', 'B'];

/**
 * Which note numbers are black keys in an octave. 0 index
 */
const BLACK_NOTES_IN_OCTAVE = [1, 3, 6, 8, 10];
const OCTAVE_PATTERN_BEGIN = 4; // 0 index
const NOTES_IN_OCTAVE = 12;
const MULTIPLIER = pow(2, 1/12);
const A4_KEY = 49;
const A4_FREQUENCY = 440;

/**
 * Use twelth root of 2 as shown https://en.wikipedia.org/wiki/Piano_key_frequencies
 */
function getFrequency(keyNum) {
  return pow(MULTIPLIER, (keyNum - A4_KEY)) * A4_FREQUENCY;
}

/**
 * Get which octave a note falls in
 */
function getOctave(keyNum) {
  return round((keyNum + 2) / NOTES_IN_OCTAVE);
}

/**
 * Get the name of a note (e.g 'C8', 'C#1/D♭1')
 */
function getNoteName(keyNum) {
  const noteName = NOTE_NAMES[getNumberInOctave(keyNum)];
  const octaveNum = getOctave(keyNum);

  // Split the note on the '/' character so we can inject
  return noteName.split('/').map(str => `${str}${octaveNum}`).join('/');
}

/**
 * Figure out which number a given key is in the octave pattern. Starts at 0.
 */
function getNumberInOctave(keyNum) {
  const adjustedKeyNum = keyNum - OCTAVE_PATTERN_BEGIN;
  let index = adjustedKeyNum % NOTES_IN_OCTAVE;

  return index < 0 ? NOTES_IN_OCTAVE + index : index;
}

/**
 * Get whether or not a key should be a black key
 */
function isKeyBlack(keyNum) {
  const numberInOctave = getNumberInOctave(keyNum);
  return BLACK_NOTES_IN_OCTAVE.indexOf(numberInOctave) > -1;
}

/**
 * Generate an array of keyboard keys. Each array value will include the `frequency`, `isBlack`,
 * and `noteName`
 *
 * @param {number} firstKey The first key you want as part of your keyboard
 * @param {number} lastKey The last piano key you want as part of your keyboard
 *
 * return {array{
 */
export default function generateKeys(firstKey = 1, lastKey = MAX_KEYS) {
  const keys = [];

  // There are 88 keys on a piano
  for (let i = firstKey; i <= lastKey; i++) {
    const frequency = getFrequency(i);
    const isBlack = isKeyBlack(i);
    const noteName = getNoteName(i);
    const numberInOctave = getNumberInOctave(i);

    keys.push({
      frequency,
      isBlack,
      noteName,
      numberInOctave,
    });
  }

  return keys;
}
