import Service from 'ember-service';
import injectService from 'ember-service/inject';
import get from 'ember-metal/get';

export default Service.extend({
  audioContext: injectService(),

  /**
   * Get an oscillator object which represents a waveform.
   */
  _createOscillator() {
    return get(this, 'audioContext.context').createOscillator();
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
    oscillator.frequency.value = frequency;
    oscillator.type = type;

    // Start the oscillator. Sound won't happen until the oscillator is connected to the context
    oscillator.start(0);

    return oscillator;
  },

  /**
   * Play a sounds created by `createSound`.
   *
   * @param {object} sound A sound created by `createSound`
   *
   * ```javascript
   * const oscillator = get(this, 'oscillator');
   * oscillator.playSound(createSound());
   * ```
   */
  playSound(sound) {
    sound.connect(get(this, 'audioContext.context.destination'));
  },

  /**
   * Stop playing a sound
   *
   * @param {object} sound A sound created by `createSound`
   */
  stopSound(sound) {
    sound.disconnect();
  },
});
