import Service from 'ember-service';

export const AudioContextStub = Service.extend({
  context: {},
});

export const OscillatorStub = Service.extend({
  createSound: () => {},
  playSound() {},
  stopSound() {},
});

export const WindowEventsStub = Service.extend({
  isMouseDown: false,
});
