import { moduleFor, test } from 'ember-qunit';
import td from 'testdouble';
import { AudioContextStub } from 'piano-keyboard/tests/helpers/mocked-services';

const { when, replace, reset, verify } = td;

/**
 * Create a mock oscillator object
 */
function getMockOscillator() {
  const osc = td.object(['start', 'connect', 'disconnect']);
  osc.frequency = {};
  return osc;
}

/**
 * Force the service to provide the mocked oscillator
 */
function stubOscillator(service, oscillator) {
  const oscillatorDouble = replace(service, '_createOscillator');
  when(oscillatorDouble()).thenReturn(oscillator);
}

moduleFor('service:oscillator', 'Unit | Service | oscillator', {
  beforeEach() {
    this.register('service:audio-context', AudioContextStub);
  },

  afterEach() {
    reset();
  },
});

test('#createSound sets the frequency', function(assert) {
  let service = this.subject();

  const freq = 500;

  // Mock the oscillator call
  stubOscillator(service, getMockOscillator());

  const sound = service.createSound(freq);

  assert.equal(sound.frequency.value, freq, 'Set frequency correctly');
});

test('#createSound sets the waveform', function(assert) {
  let service = this.subject();
  const type = 'triangle';

  stubOscillator(service, getMockOscillator());

  const sound = service.createSound(null, type);

  assert.equal(sound.type, type, 'Set type correctly');
});

test('#createSound starts the oscillator', function(assert) {
  // Mock the context
  let service = this.subject();

  const osc = getMockOscillator();

  // Mock the oscillator call
  stubOscillator(service, osc);

  service.createSound();

  assert.equal(verify(osc.start(0)), undefined, 'Called start');
});

test('#playSound connects the destination source', function(assert) {
  let service = this.subject();
  const destination = 'foo';

  // Mock the context
  service.set('audioContext.context', { destination });

  const osc = getMockOscillator();

  service.playSound(osc);

  assert.equal(verify(osc.connect(destination)), undefined, 'Connected');
});

test('#stopSound disconnects from the destination source', function(assert) {
  let service = this.subject();

  const osc = getMockOscillator();

  service.stopSound(osc);

  assert.equal(verify(osc.disconnect()), undefined, 'disconnected');
});
