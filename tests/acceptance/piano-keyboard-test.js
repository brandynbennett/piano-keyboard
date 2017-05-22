import { test } from 'qunit';
import moduleForAcceptance from 'piano-keyboard/tests/helpers/module-for-acceptance';
import pianoKeyboard from 'piano-keyboard/tests/helpers/page-object';
import { HOME_ROW, A_KEY } from 'piano-keyboard/utils/key-bindings';
import { OscillatorStub } from 'piano-keyboard/tests/helpers/mocked-services';

moduleForAcceptance('Acceptance | piano keyboard', {
  beforeEach() {
    // Mock the oscillator otherwise our tests will play notes (potentially forever)
    this.application.register('service:mock-oscillator', OscillatorStub);
    this.application.inject('component', 'oscillator', 'service:mock-oscillator');
  },
});

test('Piano has correct keys', function(assert) {
  assert.expect(2);
  pianoKeyboard.visitKeyBoard();

  andThen(() => {
    assert.equal(pianoKeyboard.getWhiteKeys().length, 52, 'Has correct white keys');
    assert.equal(pianoKeyboard.getBlackKeys().length, 36, 'Has correct white keys');
  });
});

test('C notes show their name', function(assert) {
  assert.expect(4);
  pianoKeyboard.visitKeyBoard();

  andThen(() => {
    assert.equal(pianoKeyboard.getNoteName(3), 'C1', 'Has note name');
    assert.notOk(pianoKeyboard.isNoteNameHidden(3), 'Note is not hidden');
    assert.equal(pianoKeyboard.getNoteName(3 + (12 * 3)), 'C4', 'Has note name');
    assert.notOk(pianoKeyboard.isNoteNameHidden(3 + (12 * 3)), 'Note is not hidden');
  });
});

test('Non C-notes show their name to screen readers only', function(assert) {
  assert.expect(4);
  pianoKeyboard.visitKeyBoard();

  andThen(() => {
    assert.equal(pianoKeyboard.getNoteName(5), 'D1', 'Has note name');
    assert.ok(pianoKeyboard.isNoteNameHidden(5), 'Note is hidden');
    assert.equal(pianoKeyboard.getNoteName(5 + (12 * 3)), 'D4', 'Has note name');
    assert.ok(pianoKeyboard.isNoteNameHidden(5 + (12 * 3)), 'Note is hidden');
  });
});

test('Can lock and unlock scrolling', function(assert) {
  assert.expect(4);
  pianoKeyboard.visitKeyBoard();

  andThen(() => {
    assert.equal(pianoKeyboard.getCurrentScrollMode(), 'Scroll', 'Mode set to scroll');
    assert.equal(pianoKeyboard.canPianoScroll(), true, 'Piano can scroll');
  });

  pianoKeyboard.switchScrollMode();

  andThen(() => {
    assert.equal(pianoKeyboard.getCurrentScrollMode(), 'Glissando', 'Mode set to not scroll');
    assert.equal(pianoKeyboard.canPianoScroll(), false, 'Piano can not scroll');
  });
});

test('Note plays when pressed down', function(assert) {
  assert.expect(1);
  pianoKeyboard.visitKeyBoard();
  pianoKeyboard.pressKeyDown(0);

  andThen(() => {
    assert.ok(pianoKeyboard.isKeyPlaying(0), 'Key is playing');
  });
});

test('Shows computer key bindings', function(assert) {
  assert.expect(2);
  pianoKeyboard.visitKeyBoard();

  andThen(() => {
    assert.equal(pianoKeyboard.getWhiteComputerKeyBindings().length,
      HOME_ROW.length,
      'Has white key bindings');
    assert.equal(pianoKeyboard.getBlackComputerKeyBindings().length,
      8 || 9,
      'Has black key bindings');
  });
});
