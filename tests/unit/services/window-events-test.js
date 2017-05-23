import { moduleFor, test } from 'ember-qunit';
import td from 'testdouble';

const { verify, when } = td;

moduleFor('service:window-events', 'Unit | Service | window events');

test('It listens to mouse events', function(assert) {
  assert.expect(2);
  let mouseDownDouble = td.func();
  let mouseUpDouble = td.func();
  let getMouseDownDouble = td.func();
  when(getMouseDownDouble()).thenReturn(mouseDownDouble);
  let getMouseUpDouble = td.func();
  when(getMouseUpDouble()).thenReturn(mouseUpDouble);
  let addListenerDouble = td.func();
  this.subject({
    _getMouseDownFunc: getMouseDownDouble,
    _getMouseUpFunc: getMouseUpDouble,
    _addEventListener: addListenerDouble,
  });

  assert.equal(verify(addListenerDouble('mousedown', mouseDownDouble)), undefined, 'Listen to mousedown');
  assert.equal(verify(addListenerDouble('mouseup', mouseUpDouble)), undefined, 'Listen to mouseup');
});

test('It stops listening to mouse events', function(assert) {
  assert.expect(2);
  let mouseDownDouble = td.func();
  let mouseUpDouble = td.func();
  let getMouseDownDouble = td.func();
  when(getMouseDownDouble()).thenReturn(mouseDownDouble);
  let getMouseUpDouble = td.func();
  when(getMouseUpDouble()).thenReturn(mouseUpDouble);
  let addListenerDouble = td.func();
  let removeListenerDouble = td.func();
  let service = this.subject({
    _getMouseDownFunc: getMouseDownDouble,
    _getMouseUpFunc: getMouseUpDouble,
    _addEventListener: addListenerDouble,
    _removeEventListener: removeListenerDouble,
  });

  service.willDestroy();

  assert.equal(verify(removeListenerDouble('mousedown', mouseDownDouble)), undefined, 'Stop listening to mousedown');
  assert.equal(verify(removeListenerDouble('mouseup', mouseUpDouble)), undefined, 'Stop listening to mouseup');
});
