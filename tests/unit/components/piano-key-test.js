import { moduleForComponent, test } from 'ember-qunit';
import td from 'testdouble';
import { OscillatorStub } from 'piano-keyboard/tests/helpers/mocked-services';

const { verify } = td;

moduleForComponent('piano-key', 'Unit | Component | piano key', {
  unit: true,

  beforeEach() {
    this.register('service:oscillator', OscillatorStub);
  },
});

test('It fires action when entering viewport', function(assert) {
  let enterViewportDouble = td.func();
  let noteIndex = 1;
  let component = this.subject({
    onEnterViewport: enterViewportDouble,
    noteIndex,
  });

  component.didEnterViewport();
  assert.equal(verify(enterViewportDouble(noteIndex)), undefined, 'Called action');
});

test('It fires action when exiting viewport', function(assert) {
  let exitViewportDouble = td.func();
  let noteIndex = 1;
  let component = this.subject({
    onExitViewport: exitViewportDouble,
    noteIndex,
  });

  component.didExitViewport();
  assert.equal(verify(exitViewportDouble(noteIndex)), undefined, 'Called action');
});
