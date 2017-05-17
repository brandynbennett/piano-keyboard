import { moduleFor, test } from 'ember-qunit';
import td from 'testdouble';

const { when, reset } = td;

moduleFor('service:audio-context', 'Unit | Service | audio context', {
  afterEach() {
    reset();
  }
});

test('#init creates a new audio context', function(assert) {
  assert.expect(1);

  let audioContext = { foo: 'bar' };
  let audioContextDouble = td.func();
  when(audioContextDouble()).thenReturn(audioContext);
  let service = this.subject({
    _getAudioContext: audioContextDouble,
  });

  assert.deepEqual(service.context, audioContext, 'Context initialized');
});
