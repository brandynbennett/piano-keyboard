import Component from 'ember-component';
import generateKeys, { MAX_KEYS } from 'piano-keyboard/utils/note-data';
import set from 'ember-metal/set';
import get from 'ember-metal/get';
import computed, { sort } from 'ember-computed';
import { HOME_ROW, TOP_ROW } from 'piano-keyboard/utils/key-bindings';

/**
 * The number of keys that need to be in the viewport for us to center the computer keyboard
 * bindings instead of having them be at the beginning of the keyboard
 * Exported for testing
 */
export const SHOULD_CENTER_BINDINGS_AT = 28;

export default Component.extend({
  classNames: ['piano-keys'],
  classNameBindings: ['isScrollable'],

  /**
   * Get the piano key index to start adding computer keyboard bindings
   */
  bindingStartIndex: computed('pianoKeys', 'sortedKeysInViewport.[]', function() {
    const viewportKeys = get(this, 'sortedKeysInViewport');
    const pianoKeys = get(this, 'pianoKeys');
    const shouldCenterBindings = viewportKeys.length >= SHOULD_CENTER_BINDINGS_AT;

    // If we should center the bindings (when the keyboard is long it doesn't make sense to have
    // the first key binding be at the far left of the screen) we need to find the "C" note that's
    // most center.
    if (shouldCenterBindings) {
      const cNotes = viewportKeys.filter(keyIndex => {
        return pianoKeys[keyIndex].numberInOctave === 0;
      });

      return cNotes[0];
    }

    // Use the first key in the viewport
    return viewportKeys[0];
  }).readOnly(),

  /**
   * The array of piano key objects including keyboard keys to bind them to
   */
  pianoKeysWithBindings: computed('pianoKeys', 'bindingStartIndex', function() {
    const pianoKeys = get(this, 'pianoKeys');
    const bindingStartIndex = get(this, 'bindingStartIndex');
    let computerKeyIndex = 0;

    // Create a new array so that the original keys aren't affected. Then we won't have to worry
    // about removing key bindings from existing keys.
    return pianoKeys.map((key, index) => {
      const { isBlack } = key;
      let computerKey = null;
      set(key, 'computerKey', computerKey);

      // If the key is below the one where we should try and add key bindings, then we don't need
      // to add a key binding.
      if (index < bindingStartIndex) {
        return key;
      }

      // We want the black keys to be bound to the top row key that is right after the white
      // key's binding.
      if (isBlack) {
        computerKey = TOP_ROW[computerKeyIndex];
      } else {
        // Keep track of which home row keys we've already used
        computerKey = HOME_ROW[computerKeyIndex];
        computerKeyIndex++;
      }

      set(key, 'computerKey', computerKey || null);
      return key;
    });
  }).readOnly(),

  /**
   * The array of piano key objects with the data about each key
   */
  pianoKeys: [],

  /**
   * Whether or not to allow the user to get to other parts of the keyboard by scrolling. By
   * preventing the keys from scrolling over you can do glissando
   */
  isScrollable: true,

  /**
   * An array of keys that are currently being displayed. We want to know this so we can assign
   * key bindings
   */
  keysInViewport: [],

  /**
   * We want to make sure the keys are always in order from least to greatest.
   */
  sortedKeysInViewport: sort('keysInViewport.[]', (a, b) => a - b).readOnly(),

  /**
   * The wave mode for the keys
   */
  waveMode: '',

  init() {
    this._super(...arguments);
    set(this, 'pianoKeys', this._generateKeys());
  },

  didInsertElement() {
    this._scrollToMiddle();
  },

  /**
   * Proxy to module. Useful for testing.
   */
  _generateKeys(firstKey = 1, lastKey = MAX_KEYS) {
    return generateKeys(firstKey, lastKey);
  },

  /**
   * We want to scroll to the middle of the keyboard when the page loads so the keyboard is in a
   * more useable spot
   */
  _scrollToMiddle() {
    let middleCIndex = 39;
    this._scrollLeft(this._getKeyLeftOffset(middleCIndex));
   },

  _getKeyLeftOffset(keyNum) {
    return this.$('.piano-key').eq(keyNum).offset().left;
  },

  /**
   * Proxy to DOM
   */
  _scrollLeft(num) {
    this.$()[0].scrollLeft = num;
  },

  actions: {
    keyEnteredViewport(keyIndex) {
      // Need to create a new array to force the rerender
      let keysInViewport = get(this, 'keysInViewport');
      keysInViewport = keysInViewport.concat([keyIndex]);
      set(this, 'keysInViewport', keysInViewport);
    },

    keyExitedViewport(keyIndex) {
      let keysInViewport = get(this, 'keysInViewport');
      keysInViewport.splice(keysInViewport.indexOf(keyIndex), 1);

      // Need to create a new array to force the rerender
      keysInViewport = keysInViewport.concat([]);
      set(this, 'keysInViewport', keysInViewport);
    },
  },
});
