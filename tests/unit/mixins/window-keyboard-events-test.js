import EmberObject from 'ember-object';
import WindowKeyboardEventsMixin from 'piano-keyboard/mixins/window-keyboard-events';
import { module, test } from 'qunit';
import td from 'testdouble';

const { verify, when } = td;

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
  let WindowKeyboardEventsObject = EmberObject.extend(WindowKeyboardEventsMixin, {
    didWindowKeyUp: keyUpDouble,
    didWindowKeyDown: keyDownDouble,
    _addEventListener: addListenerDouble,
    _getKeyDownFunc: getKeyDownDouble,
    _getKeyUpFunc: getKeyUpDouble,
  });
  let subject = WindowKeyboardEventsObject.create();
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
  let WindowKeyboardEventsObject = EmberObject.extend(WindowKeyboardEventsMixin, {
    didWindowKeyUp: keyUpDouble,
    didWindowKeyDown: keyDownDouble,
    _getKeyDownFunc: getKeyDownDouble,
    _getKeyUpFunc: getKeyUpDouble,
    _removeEventListener: removeListenerDouble,
  });
  let subject = WindowKeyboardEventsObject.create();
  subject.willDestroyElement();

  assert.equal(verify(removeListenerDouble('keydown', keyDownDouble)), undefined, 'unbound to key down');
  assert.equal(verify(removeListenerDouble('keyup', keyUpDouble)), undefined, 'unbound to key down');
});
