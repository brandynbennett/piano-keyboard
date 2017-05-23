import EmberObject from 'ember-object';
import WindowEventsMixin from 'piano-keyboard/mixins/window-events';
import { module, test } from 'qunit';
import td from 'testdouble';

const { verify, when, matchers: { anything }} = td;

module('Unit | Mixin | window keyboard events');

test('Listens to keyboard events', function(assert) {
  assert.expect(2);
  let keyDownDouble = td.func();
  let keyUpDouble = td.func();
  let getKeyDownDouble = td.func();
  when(getKeyDownDouble()).thenReturn(keyDownDouble);
  let getKeyUpDouble = td.func();
  when(getKeyUpDouble()).thenReturn(keyUpDouble);
  let addListenerDouble = td.func();
  let WindowEventsObject = EmberObject.extend(WindowEventsMixin, {
    didWindowKeyUp: keyUpDouble,
    didWindowKeyDown: keyDownDouble,
    _addEventListener: addListenerDouble,
    _getKeyDownFunc: getKeyDownDouble,
    _getKeyUpFunc: getKeyUpDouble,
  });
  let subject = WindowEventsObject.create();
  subject.didInsertElement();

  assert.equal(verify(addListenerDouble('keydown', keyDownDouble)), undefined, 'Bound to key down');
  assert.equal(verify(addListenerDouble('keyup', keyUpDouble)), undefined, 'Bound to key down');
});

test('Stops listening to keyboard events on destroy', function(assert) {
  assert.expect(2);
  let keyDownDouble = td.func();
  let keyUpDouble = td.func();
  let getKeyDownDouble = td.func();
  when(getKeyDownDouble()).thenReturn(keyDownDouble);
  let getKeyUpDouble = td.func();
  when(getKeyUpDouble()).thenReturn(keyUpDouble);
  let removeListenerDouble = td.func();
  let WindowEventsObject = EmberObject.extend(WindowEventsMixin, {
    didWindowKeyUp: keyUpDouble,
    didWindowKeyDown: keyDownDouble,
    _getKeyDownFunc: getKeyDownDouble,
    _getKeyUpFunc: getKeyUpDouble,
    _removeEventListener: removeListenerDouble,
  });
  let subject = WindowEventsObject.create();
  subject.willDestroyElement();

  assert.equal(verify(removeListenerDouble('keydown', keyDownDouble)), undefined, 'unbound to key down');
  assert.equal(verify(removeListenerDouble('keyup', keyUpDouble)), undefined, 'unbound to key down');
});

test('It listens to touch events', function(assert) {
  assert.expect(3);
  let touchMoveDouble = td.func();
  let getTouchMoveDouble = td.func();
  when(getTouchMoveDouble()).thenReturn(touchMoveDouble);

  let touchStartDouble = td.func();
  let getTouchStartDouble = td.func();
  when(getTouchStartDouble()).thenReturn(touchStartDouble);

  let touchEndDouble = td.func();
  let getTouchEndDouble = td.func();
  when(getTouchEndDouble()).thenReturn(touchEndDouble);

  let addListenerDouble = td.func();
  let WindowEventsObject = EmberObject.extend(WindowEventsMixin, {
    _getTouchMoveFunc: getTouchMoveDouble,
    _getTouchStartFunc: getTouchStartDouble,
    _getTouchEndFunc: getTouchEndDouble,
    _addEventListener: addListenerDouble,
  });

  let subject = WindowEventsObject.create();
  subject.didInsertElement();

  assert.equal(verify(addListenerDouble('touchmove', touchMoveDouble)), undefined, 'Listen to touchmove');
  assert.equal(verify(addListenerDouble('touchstart', touchStartDouble)), undefined, 'Listen to touchstart');
  assert.equal(verify(addListenerDouble('touchend', touchEndDouble)), undefined, 'Listen to touchend');
});

test('It fires hooks on touchmove', function(assert) {
  assert.expect(4);

  let addListenerDouble = td.func();
  let didTouchEnterDouble = td.func();
  let didTouchLeaveDouble = td.func();
  let isInsideElementDouble = td.func();
  when(isInsideElementDouble(anything(), anything())).thenReturn(true);

  let WindowEventsObject = EmberObject.extend(WindowEventsMixin, {
    _addEventListener: addListenerDouble,
    didTouchEnter: didTouchEnterDouble,
    didTouchLeave: didTouchLeaveDouble,
    _isInsideElement: isInsideElementDouble,
  });

  let subject = WindowEventsObject.create();
  subject.didInsertElement();

  let touchMoveFunc = subject._getTouchMoveFunc();
  let touchEvent = { changedTouches: [{ clientX: 'foo', clientY: 'foo' }] };
  touchMoveFunc(touchEvent);

  assert.equal(verify(didTouchEnterDouble()), undefined, 'hook was called');
  assert.equal(subject.get('isTouched'), true, 'Property is set');

  when(isInsideElementDouble(anything(), anything())).thenReturn(false);
  touchMoveFunc(touchEvent);

  assert.equal(verify(didTouchLeaveDouble()), undefined, 'hook was called');
  assert.equal(subject.get('isTouched'), false, 'Property is set');
});

test('It fires hooks on touchstart', function(assert) {
  assert.expect(4);

  let addListenerDouble = td.func();
  let didTouchStartDouble = td.func();
  let isInsideElementDouble = td.func();
  when(isInsideElementDouble(anything(), anything())).thenReturn(false);

  let WindowEventsObject = EmberObject.extend(WindowEventsMixin, {
    _addEventListener: addListenerDouble,
    didTouchStart: didTouchStartDouble,
    _isInsideElement: isInsideElementDouble,
  });

  let subject = WindowEventsObject.create();
  subject.didInsertElement();

  let touchStartFunc = subject._getTouchStartFunc();
  let touchEvent = { changedTouches: [{ clientX: 'foo', clientY: 'foo' }] };
  touchStartFunc(touchEvent);

  assert.equal(verify(didTouchStartDouble(), { times: 0 }), undefined, 'hook was not called');
  assert.equal(subject.get('isTouched'), false, 'Property is set');

  when(isInsideElementDouble(anything(), anything())).thenReturn(true);
  touchStartFunc(touchEvent);

  assert.equal(verify(didTouchStartDouble()), undefined, 'hook was called');
  assert.equal(subject.get('isTouched'), true, 'Property is set');
});

test('It fires hooks on touchend', function(assert) {
  assert.expect(4);

  let addListenerDouble = td.func();
  let didTouchEndDouble = td.func();
  let isInsideElementDouble = td.func();
  when(isInsideElementDouble(anything(), anything())).thenReturn(false);

  let WindowEventsObject = EmberObject.extend(WindowEventsMixin, {
    _addEventListener: addListenerDouble,
    didTouchEnd: didTouchEndDouble,
    _isInsideElement: isInsideElementDouble,
  });

  let subject = WindowEventsObject.create();
  subject.didInsertElement();

  let touchEndFunc = subject._getTouchEndFunc();
  let touchEvent = { changedTouches: [{ clientX: 'foo', clientY: 'foo' }] };
  touchEndFunc(touchEvent);

  assert.equal(verify(didTouchEndDouble(), { times: 0 }), undefined, 'hook was not called');
  assert.equal(subject.get('isTouched'), false, 'Property is set');

  when(isInsideElementDouble(anything(), anything())).thenReturn(true);
  touchEndFunc(touchEvent);

  assert.equal(verify(didTouchEndDouble()), undefined, 'hook was called');
  assert.equal(subject.get('isTouched'), false, 'Property is set');
});
