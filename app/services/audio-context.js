import Service from 'ember-service';
import set from 'ember-metal/set';

/**
 * This service proxies to the AudioContext, which is necessary for generating sounds in the browser
 */
export default Service.extend({
  /**
   * The AudioContext. Required to get and receive sounds.
   */
  context: null,

  init() {
    this._super(...arguments);

    this._initializeContext();
  },

  /**
   * Setup the audio context
   */
  _initializeContext() {
    set(this, 'context', this._getAudioContext());
  },

  /**
   * Proxy to Web Audio API
   */
  _getAudioContext() {
    const audioContext = window.AudioContext || window.webkitAudioContext;
    return new audioContext();
  },
});
