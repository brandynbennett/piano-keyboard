import Service from 'ember-service';
import set from 'ember-metal/set';
import get from 'ember-metal/get';

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
    return new AudioContext();
  },
});
