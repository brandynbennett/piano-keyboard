import Component from 'ember-component';
import scrollModes from 'piano-keyboard/utils/scroll-modes';
import waveModes from 'piano-keyboard/utils/wave-modes';
import set from 'ember-metal/set';

const PREVENT_SCROLL_FUNC = evt => evt.preventDefault();

/**
 * An entire piano keyboard including controls and keys
 */
export default Component.extend({
  classNames: ['piano-keyboard'],

  /**
   * Modes that affect the way the user can scroll the keyboard.
   */
  scrollModes,

  /**
   * Modes that affect the sound of the keys
   */
  waveModes,

  /**
   * Whether or not the keyboard should be able to scroll
   */
  shouldScroll: true,

  /**
   * The wave mode that the user selected
   */
  selectedWaveMode: waveModes[0],

  actions: {
    /**
     * When the user changes the scroll mode we should update the state
     */
    onScrollModeSwitch(mode) {
      let shouldScroll = mode.value === 'SCROLL';
      set(this, 'shouldScroll', shouldScroll);

       // The body will still scroll on mobile devices on touchmove so we need to prevent the event
       // by doing this
      if (!shouldScroll) {
        this._addEventListener('touchmove', this._getPreventScroll());
      } else {
        this._removeEventListener('touchmove', this._getPreventScroll());
      }
    },

    /**
     * Update the state when the user updates the wave mode
     */
    onWaveModeSwitch(mode) {
      set(this, 'selectedWaveMode', mode);
    },
  },

  /**
   * Proxy to DOM
   */
  _addEventListener(event, func) {
    document.body.addEventListener(event, func, false);
  },

  /**
   * Proxy to DOM
   */
  _removeEventListener(event, func) {
    document.body.removeEventListener(event, func, false);
  },

  /**
   * Get the prevent scroll function
   */
  _getPreventScroll() {
    return PREVENT_SCROLL_FUNC;
  },
});
