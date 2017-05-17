import Component from 'ember-component'
import injectService from 'ember-service/inject';
import get from 'ember-metal/get';

export default Component.extend({
  classNames: ['piano-key'],
  oscillator: injectService(),

  click() {
    const oscillator = get(this, 'oscillator');
    oscillator.playSound(oscillator.createSound());
  },
});
