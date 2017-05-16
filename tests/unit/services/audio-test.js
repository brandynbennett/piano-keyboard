import { moduleFor, test } from 'ember-qunit';
import td from 'testdouble';

const { when, replace, reset, verify } = td;

function getMockOscillator() {
  const osc = td.object(['start', 'connect']);
  osc.frequency = {};
  return osc;
}

moduleFor('service:audio', 'Unit | Service | audio', {
  afterEach() {
    reset();
  },
});

test('#createSound sets the frequency', function(assert) {
  let service = this.subject();
  const freq = 500;

  // Mock the context
  service._context = {};

  const osc = getMockOscillator();

  // Mock the oscillator call
  const oscillatorDouble = replace(service, '_createOscillator');
  when(oscillatorDouble()).thenReturn(osc);

  const sound = service.createSound(freq);

  assert.equal(sound.frequency.value, freq, 'Set frequency correctly');
});

test('#createSound sets the waveform', function(assert) {
  let service = this.subject();
  const type = 'triangle';

  // Mock the context
  service._context = {};

  const osc = getMockOscillator();

  // Mock the oscillator call
  const oscillatorDouble = replace(service, '_createOscillator');
  when(oscillatorDouble()).thenReturn(osc);

  const sound = service.createSound(null, type);

  assert.equal(sound.type, type, 'Set type correctly');
});

test('#createSound starts the oscillator', function(assert) {
  let service = this.subject();

  // Mock the context
  service._context = {};

  const osc = getMockOscillator();

  // Mock the oscillator call
  const oscillatorDouble = replace(service, '_createOscillator');
  when(oscillatorDouble()).thenReturn(osc);

  service.createSound();

  assert.equal(verify(osc.start(0)), undefined, 'Called start');
});

test('#createSound connects the destination source', function(assert) {
  let service = this.subject();
  const destination = 'foo';

  // Mock the context
  service._context = { destination };

  const osc = getMockOscillator();

  // Mock the oscillator call
  const oscillatorDouble = replace(service, '_createOscillator');
  when(oscillatorDouble()).thenReturn(osc);

  service.createSound();

  assert.equal(verify(osc.connect(destination)), undefined, 'Connected');
});
