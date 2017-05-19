import Component from 'ember-component';
import generateKeys, { MAX_KEYS } from 'piano-keyboard/utils/note-data';
import set from 'ember-metal/set';

export default Component.extend({
  classNames: ['piano-keys'],
  classNameBindings: ['isScrollable'],

  /**
   * The array of piano key objects with the data about each key
   */
  pianoKeys: null,

  /**
   * Whether or not to allow the user to get to other parts of the keyboard by scrolling. By
   * preventing the keys from scrolling over you can do glissando
   */
  isScrollable: true,

  init() {
    this._super(...arguments);
    set(this, 'pianoKeys', this._generateKeys());
  },

  /**
   * Proxy to module. Useful for testing.
   */
  _generateKeys(firstKey = 1, lastKey = MAX_KEYS) {
    return generateKeys(firstKey, lastKey);
  },
});
