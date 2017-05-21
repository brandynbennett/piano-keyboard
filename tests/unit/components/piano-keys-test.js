import { moduleForComponent, test } from 'ember-qunit';
import { A_KEY, S_KEY, D_KEY, W_KEY, R_KEY, T_KEY } from 'piano-keyboard/utils/key-bindings';
import { SHOULD_CENTER_BINDINGS_AT } from 'piano-keyboard/components/piano-keys';

moduleForComponent('piano-keys', 'Unit | Component | piano keys', {
  unit: true,
});

test('Tracks keys that enter the viewport', function(assert) {
  assert.expect(1);
  let component = this.subject();
  let keyIndex = 1;
  let expected = [keyIndex];
  // Adding the property to the `actions` hash so the `this` will be correct in the unit test
  component.actions.keysInViewport = component.get('keysInViewport');
  component.actions.keyEnteredViewport(keyIndex);

  assert.deepEqual(component.actions.keysInViewport, expected, 'Added key');
});

test('Tracks keys that leave the viewport', function(assert) {
  assert.expect(1);
  let keyIndex = 1;
  let component = this.subject({
    keysInViewport: [keyIndex],
  });
  let expected = [];
  // Adding the property to the `actions` hash so the `this` will be correct in the unit test
  component.actions.keysInViewport = component.get('keysInViewport');
  component.actions.keyExitedViewport(keyIndex);

  assert.deepEqual(component.actions.keysInViewport, expected, 'Removed key');
});

test('Keys are sorted', function(assert) {
  assert.expect(2);
  let keysInViewport = [5, 4, 3];
  let component = this.subject({
    keysInViewport,
  });
  let expected = [3, 4, 5];
  assert.deepEqual(component.get('sortedKeysInViewport'), expected, 'Sorted keys');

  keysInViewport = [3, 2, 1];
  expected = [1, 2, 3];
  component.set('keysInViewport', keysInViewport);
  assert.deepEqual(component.get('sortedKeysInViewport'), expected, 'Sorted keys');
});

test('Decorates white keys with keyboard bindings', function(assert) {
  assert.expect(3);

  let component = this.subject();

  component.bindingStartIndex = 0;

  let pianoKeys = component.get('pianoKeysWithBindings');

  assert.equal(pianoKeys[0].computerKey.keyCode, A_KEY);
  assert.equal(pianoKeys[2].computerKey.keyCode, S_KEY);
  assert.equal(pianoKeys[3].computerKey.keyCode, D_KEY);
});

test('Decorates black keys with keyboard bindings', function(assert) {
  assert.expect(3);

  let component = this.subject();

  component.bindingStartIndex = 0;

  let pianoKeys = component.get('pianoKeysWithBindings');

  assert.equal(pianoKeys[1].computerKey.keyCode, W_KEY);
  assert.equal(pianoKeys[4].computerKey.keyCode, R_KEY);
  assert.equal(pianoKeys[6].computerKey.keyCode, T_KEY);
});

test('Decorates white keys with keyboard bindings at different start index', function(assert) {
  assert.expect(3);

  let component = this.subject();

  component.bindingStartIndex = 12;

  let pianoKeys = component.get('pianoKeysWithBindings');

  assert.equal(pianoKeys[12].computerKey.keyCode, A_KEY);
  assert.equal(pianoKeys[14].computerKey.keyCode, S_KEY);
  assert.equal(pianoKeys[15].computerKey.keyCode, D_KEY);
});

test('Starts adding keybindings at the beginning if there are too few keys', function(assert) {
  assert.expect(1);

  let keysInViewport = [5, 4, 3];
  let component = this.subject({
    keysInViewport,
  });

  assert.equal(component.get('bindingStartIndex'), 3, 'Binds at beginning of keyboard');
});

test('Starts adding keybindings on C note most in the middle if enough keys are in view', function(assert) {
  assert.expect(1);

  let keysInViewport = [];
  for (let i = 0; i <= SHOULD_CENTER_BINDINGS_AT; i++) {
    keysInViewport.push(i);
  }

  let component = this.subject({
    keysInViewport,
  });

  assert.equal(component.get('bindingStartIndex'), 15, 'Binds at the C most in the middle')
});

test('Starts adding keybindings on C note most in the middle if more than 3 C notes in view', function(assert) {
  assert.expect(1);

  let keysInViewport = [];
  for (let i = 0; i <= 87; i++) {
    keysInViewport.push(i);
  }

  let component = this.subject({
    keysInViewport,
  });

  assert.equal(component.get('bindingStartIndex'), 15, 'Binds at the C most in the middle')
});

test('Starts adding keybindings on the first C note if less than 3 C notes showing', function(assert) {
  assert.expect(1);

  let offset = 7;
  let stop = SHOULD_CENTER_BINDINGS_AT + offset;
  let keysInViewport = [];
  for (let i = offset; i <= stop; i++) {
    keysInViewport.push(i);
  }

  let component = this.subject({
    keysInViewport,
  });

  assert.equal(component.get('bindingStartIndex'), 15, 'Binds at the C most in the middle')
});
