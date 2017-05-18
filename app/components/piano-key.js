import Component from 'ember-component'
import injectService from 'ember-service/inject';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed, { equal } from 'ember-computed';

export default Component.extend({
  classNames: ['piano-key'],
  classNameBindings: ['isBlack', 'isPlaying'],

  oscillator: injectService(),

  /**
   * Whether or not the key is a black key on the keyboard
   */
  isBlack: false,

  /**
   * Whether or not the key is making a noise
   */
  isPlaying: false,

  /**
   * The name of the note the key represents (e.g. 'C0', 'A4')
   */
  noteName: '',

  /**
   * Index of the number in the octave 0 - 11
   */
  numberInOctave: null,

  /**
   * The frequency the note should be
   */
  frequency: null,

  /**
   * The sound object created from the oscillator
   */
  sound: computed('frequency', function() {
    return get(this, 'oscillator').createSound(get(this, 'frequency'));
  }).readOnly(),

  /**
   * We only want to show the note name if it's a "C"
   */
  shouldShowNoteName: equal('numberInOctave', 0),

  /**
   * Stop playing a sound
   */
  stopPlaying() {
    get(this, 'oscillator').stopSound(get(this, 'sound'));
    set(this, 'isPlaying', false);
  },

  /**
   * Start playing a sound
   */
  startPlaying() {
    get(this, 'oscillator').playSound(get(this, 'sound'));
    set(this, 'isPlaying', true);
  },

  mouseDown() {
    this.startPlaying();
  },


  mouseUp() {
    this.stopPlaying();
  },

  /**
   * If the mouse leaves the button without unclicking we still want to stop playing.
   */
  mouseLeave() {
    this.stopPlaying();
  },

  /**
   * Need touch events for phones
   */
  touchStart() {
    this.startPlaying();
  },

  touchEnd() {
    this.stopPlaying();
  },
});
