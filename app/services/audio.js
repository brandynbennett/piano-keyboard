import Service from 'ember-service';
import set from 'ember-metal/set';
import get from 'ember-metal/get';

export default Service.extend({
  /**
   * The AudioContext. Required to get and receive sounds.
   */
  _context: null,

  init() {
    this._super(...arguments);

    this._initializeContext();
  },

  /**
   * Setup the audio context
   */
  _initializeContext() {
    set(this, '_context', this._getAudioContext());
  },

  /**
   * Proxy to Web Audio API
   */
  _getAudioContext() {
    return new AudioContext();
  },

  /**
   * Get an oscillator object which represents a waveform.
   */
  _createOscillator() {
    return get(this, '_context').createOscillator();
  },

  /**
   * Create a new sound
   *
   * @param {number} frequency The number of Hz the sound should be
   * @param {string} type The waveform to play the sound at.
   * [supported types](https://developer.mozilla.org/en-US/docs/Web/API/OscillatorNode/type)
   */
  createSound(frequency = 440, type = 'sine') {
    const oscillator = this._createOscillator();
    const destination = get(this, '_context').destination;
    oscillator.frequency.value = frequency;
    oscillator.type = type;

    // Start the oscillator. Sound won't happen until the oscillator is connected to the context
    oscillator.start(0);

    return oscillator;
  },
});
