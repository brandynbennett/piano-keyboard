import {
  IS_SCROLLABLE,
  SCROLL_MODE_SWITCHER,
  PIANO_KEY,
  IS_BLACK,
  NOTE_NAME,
  SR_TEXT,
  COMPUTER_KEY_BINDING,
  IS_PLAYING,
} from 'piano-keyboard/tests/helpers/dom-selectors';

export default {
  visitKeyBoard() {
    visit('/');
  },

  canPianoScroll() {
    return find(IS_SCROLLABLE).length > 0;
  },

  switchScrollMode() {
    click(SCROLL_MODE_SWITCHER);
  },

  getCurrentScrollMode() {
    return find(SCROLL_MODE_SWITCHER).text().trim();
  },

  getWhiteKeys() {
    return find(PIANO_KEY).not(IS_BLACK);
  },

  getBlackKeys() {
    return find(IS_BLACK);
  },

  getNoteName(num) {
    return find(`${PIANO_KEY} ${NOTE_NAME}`).eq(num).text().trim();
  },

  isNoteNameHidden(num) {
    return find(`${PIANO_KEY} ${NOTE_NAME}`).eq(num).hasClass(SR_TEXT.replace('.', ''));
  },

  getWhiteComputerKeyBindings() {
    return find(PIANO_KEY).not(IS_BLACK).find(COMPUTER_KEY_BINDING);
  },

  getBlackComputerKeyBindings() {
    return find(`${IS_BLACK} ${COMPUTER_KEY_BINDING}`);
  },

  getPianoKey(num) {
    return find(PIANO_KEY).eq(num);
  },

  isKeyPlaying(num) {
    return this.getPianoKey(num).hasClass(IS_PLAYING.replace('.', ''));
  },

  pressKeyDown(num) {
    triggerEvent(`${PIANO_KEY}:nth-child(${num + 1})`, 'mousedown');
  },
};
