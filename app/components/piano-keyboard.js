import Component from 'ember-component';
import scrollModes from 'piano-keyboard/utils/scroll-modes';
import set from 'ember-metal/set';

const PREVENT_SCROLL_FUNC = evt => evt.preventDefault();

export default Component.extend({
  classNames: ['piano-keyboard'],

  /**
   * Modes that affect the way the user can scroll the keyboard.
   */
  scrollModes,

  /**
   * Whether or not the keyboard should be able to scroll
   */
  shouldScroll: true,

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
