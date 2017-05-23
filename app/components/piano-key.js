import Component from 'ember-component'
import injectService from 'ember-service/inject';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed, { equal, and } from 'ember-computed';
import InViewportMixin from 'ember-in-viewport';
import WindowEventsMixin from 'piano-keyboard/mixins/window-events';
import on from 'ember-evented/on';
import { DEFAULT_WAVE_MODE } from 'piano-keyboard/utils/wave-modes';

/**
 * An individual piano key
 *
 * @param {boolean} isBlack If it's a black key vs a white key
 * @param {string} noteName The name of the note the key represents (e.g. 'C0', 'A4')
 * @param {number} numberInOctave Index of the number in the octave 0 - 11
 * @param {number} frequency The frequency the note should be
 * @param {string} waveType The type of wave to use for the sound
 * @param {number} noteNumber The number of the note on the keyboard 1 - 88
 * @param {number} noteIndex The index of the note
 * @param {number} computerKey The computer keyboard key to bind the note to
 * @param {boolean} showComputerKey Whether or not the user wants help knowing which notes are
 * bound to which keys
 * @param {action} onEnterViewport action to perform when the key enters the viewport. Will be
 * passed the noteIndex
 * @param {action} onExitViewport action to perform when the key enters the viewport. Will be
 * passed the noteIndex
 */
export default Component.extend(InViewportMixin, WindowEventsMixin, {
  tagName: 'button',
  classNames: ['piano-key'],
  classNameBindings: ['isBlack', 'isPlaying'],

  oscillator: injectService(),
  windowEvents: injectService(),

  /**
   * We need to set `viewport` spy to `true` otherwise the component will only be watched when it
   * enters and then it will stop being watched. We need to keep track of when the component
   * exits the viewport as well.
   *
   * @override
   */
  viewportOptionsOverride: on('didInsertElement', function() {
    set(this, 'viewportSpy', true);
  }),

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
   * The type of wave to use for the sound
   */
  waveType: '',

  /**
   * The number of the note on the keyboard 1 - 88
   */
  noteNumber: null,

  /**
   * The index of the note
   */
  noteIndex: null,

  /**
   * The computer keyboard key to bind the note to
   */
  computerKey: null,

  /**
   * Whether or not the user wants help knowing which notes are bound to which keys
   */
  showComputerKey: true,

  /**
   * If the user wants to see the computer key bindings and the key actually has one then we
   * should show it.
   */
  shouldDisplayComputerKey: and('computerKey', 'showComputerKey').readOnly(),

  /**
   * The sound object created from the oscillator
   */
  sound: computed('frequency', 'waveType', function() {
    const waveType = get(this, 'waveType') || DEFAULT_WAVE_MODE;
    return get(this, 'oscillator').createSound(get(this, 'frequency'), waveType);
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
   * Only play when the mouse enters if the mouse is already being pressed down
   */
  mouseEnter() {
    if (get(this, 'windowEvents.isMouseDown')) {
      this.startPlaying();
    }
  },

  /**
   * If the mouse leaves the button without unclicking we still want to stop playing.
   */
  mouseLeave() {
    this.stopPlaying();
  },

  /**
   *
   * @override
   */
  didTouchStart() {
    this.startPlaying();
  },

  /**
   * @override
   */
  didTouchEnd() {
    this.stopPlaying();
  },

  /**
   * @override
   */
  didTouchEnter() {
    this.startPlaying();
  },

  /**
   * @override
   */
  didTouchLeave() {
    this.stopPlaying();
  },

  /**
   * What to do when the key enters the viewport
   */
  onEnterViewport() {},

  /**
   * What to do when the key leaves the viewport
   */
  onExitViewport() {},

  /**
   * We want to trigger an action when the key enters the viewport so the parent component can
   * keep track of which keys are in the viewport. Will fire `onEnterViewport` with the note number
   *
   * @override
   */
  didEnterViewport() {
    get(this, 'onEnterViewport')(get(this, 'noteIndex'));
  },

  /**
   * We want to trigger an action when the key exits the viewport so the parent component can
   * keep track of which keys are in the viewport. Will fire `onExitViewport` with the note number
   *
   * @override
   */
  didExitViewport() {
    get(this, 'onExitViewport')(get(this, 'noteIndex'));
  },

  /**
   * @override
   */
  didWindowKeyDown({ keyCode }) {
    if (keyCode === get(this, 'computerKey.keyCode')) {
      this.startPlaying();
    }
  },

  /**
   * @override
   */
  didWindowKeyUp({ keyCode }) {
    if (keyCode === get(this, 'computerKey.keyCode')) {
      this.stopPlaying();
    }
  },
});
