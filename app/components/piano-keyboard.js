import Component from 'ember-component';
import generateKeys, { MAX_KEYS } from 'piano-keyboard/utils/note-data';
import set from 'ember-metal/set';

export default Component.extend({
  classNames: ['piano-keyboard'],

  pianoKeys: null,

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
