import { moduleForComponent, test } from 'ember-qunit';
import td from 'testdouble';

const { verify, when, replace } = td;
const TOUCH_MOVE = 'touchmove';

moduleForComponent('piano-keyboard', 'Unit | Component | piano keyboard', {
  unit: true
});

test('It prevents scrolling on touch devices', function(assert) {
  assert.expect(1);
  let component = this.subject();
  let mode = { value: 'foo' };
  let preventScrollDouble = td.func();
  let getPreventScroll = replace(component, '_getPreventScroll');
  when(getPreventScroll()).thenReturn(preventScrollDouble);
  let addEventListenerDouble = replace(component, '_addEventListener');
  component.actions.onScrollModeSwitch.bind(component)(mode);

  assert.equal(verify(addEventListenerDouble(TOUCH_MOVE, preventScrollDouble)), undefined);
});

test('It can allow scrolling on touch devices', function(assert) {
  assert.expect(1);
  let component = this.subject();
  let mode = { value: 'SCROLL' };
  let preventScrollDouble = td.func();
  let getPreventScroll = replace(component, '_getPreventScroll');
  when(getPreventScroll()).thenReturn(preventScrollDouble);
  let removeEventListenerDouble = replace(component, '_removeEventListener');
  component.actions.onScrollModeSwitch.bind(component)(mode);

  assert.equal(verify(removeEventListenerDouble(TOUCH_MOVE, preventScrollDouble)), undefined);
});
