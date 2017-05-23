import { moduleForComponent, test } from 'ember-qunit';
import td from 'testdouble';
import { OscillatorStub, WindowEventsStub } from 'piano-keyboard/tests/helpers/mocked-services';

const { verify } = td;

moduleForComponent('piano-key', 'Unit | Component | piano key', {
  unit: true,

  beforeEach() {
    this.register('service:oscillator', OscillatorStub);
    this.register('service:window-events', WindowEventsStub);
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

test('Works with touch events', function(assert) {
  assert.expect(4);

  let component = this.subject();

  component.didTouchStart();
  assert.equal(component.get('isPlaying'), true);

  component.didTouchEnd();
  assert.equal(component.get('isPlaying'), false);

  component.didTouchEnter();
  assert.equal(component.get('isPlaying'), true);

  component.didTouchLeave();
  assert.equal(component.get('isPlaying'), false);
});
