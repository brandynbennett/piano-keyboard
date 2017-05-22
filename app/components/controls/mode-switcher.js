import Component from 'ember-component';
import get from 'ember-metal/get';
import set from 'ember-metal/set';
import computed from 'ember-computed';

/**
 * Button to switch between different modes
 */
export default Component.extend({
  tagName: 'button',
  classNames: ['mode-switcher bevel-button'],

  /**
   * List of different modes. Each item should have a `value` and a `displayName`
   */
  modes: [],

  /**
   * Action that will be fired when the mode switches. Will be passed the mode object
   */
  onSwitch() {},

  /**
   * Keep track of if the parent passes in a new selected value
   */
  _oldSelectedValue: '',

  /**
   * The `value` of the mode selected most recently
   */
  selectedValue: '',

  /**
   * The index of the mode most recently selected
   */
  selectedIndex: 0,

  /**
   * The mode that is currently selected
   */
  selectedMode: computed('modes', 'selectedIndex', function() {
    return get(this, 'modes')[get(this, 'selectedIndex')];
  }).readOnly(),

  didReceiveAttrs() {
    const selectedValue = get(this, 'selectedValue');
    const oldSelectedValue = get(this, '_oldSelectedValue');
    const modes = get(this, 'modes');
    let selectedIndex = 0;

    if (selectedValue && selectedValue !== oldSelectedValue) {
      // Include the index number in the mode objects. Then filter out the nodes that have a
      // matching value.
      const matchingModes = modes
        .map((mode, index) => {
          mode.indexNum = index;
          return mode;
        })
        .filter(mode => mode.value === selectedValue);
      selectedIndex = matchingModes.length ? matchingModes[0].indexNum : 0;
    }

    set(this, 'selectedIndex', selectedIndex);
  },

  click() {
    const currentIndex = get(this, 'selectedIndex');
    const modes = get(this, 'modes');
    const nextIndex = currentIndex + 1;

    // Get the next mode in the list or the first one
    const nextModeIndex = nextIndex === modes.length ? 0 : nextIndex;
    const nextMode = modes[nextModeIndex];

    get(this, 'onSwitch')(nextMode);
    set(this, 'selectedIndex', nextModeIndex);
  },
});
