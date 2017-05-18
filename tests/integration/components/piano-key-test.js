import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { IS_BLACK, PIANO_KEY, IS_PLAYING, NOTE_NAME } from 'piano-keyboard/tests/helpers/dom-selectors';
import { OscillatorStub } from 'piano-keyboard/tests/helpers/mocked-services';

moduleForComponent('piano-key', 'Integration | Component | piano key', {
  integration: true,

  beforeEach() {
    this.register('service:oscillator', OscillatorStub);
  },
});

test('Black keys are black', function(assert) {
  assert.expect(1);

  this.render(hbs`{{piano-key isBlack=true}}`);

  assert.equal(this.$(IS_BLACK).length, 1, 'Found black key');
});

test('Classes updated when playing sound', function(assert) {
  assert.expect(1);

  this.render(hbs`{{piano-key}}`);

  this.$(PIANO_KEY).trigger('mousedown');
  assert.equal(this.$(IS_PLAYING).length, 1, 'Is playing');
});

test('Classes updated when stopping sound', function(assert) {
  assert.expect(2);

  this.render(hbs`{{piano-key}}`);

  this.$(PIANO_KEY).trigger('mousedown');
  assert.equal(this.$(IS_PLAYING).length, 1, 'Is playing');
  this.$(PIANO_KEY).trigger('mouseup');
  assert.equal(this.$(IS_PLAYING).length, 0, 'Stopped playing');
});

test('Works with touch events', function(assert) {
  assert.expect(2);

  this.render(hbs`{{piano-key}}`);

  this.$(PIANO_KEY).trigger('touchstart');
  assert.equal(this.$(IS_PLAYING).length, 1, 'Is playing');
  this.$(PIANO_KEY).trigger('touchend');
  assert.equal(this.$(IS_PLAYING).length, 0, 'Stopped playing');
});

test('Sound stops on mouseleave', function(assert) {
  assert.expect(2);

  this.render(hbs`{{piano-key}}`);

  this.$(PIANO_KEY).trigger('mousedown');
  assert.equal(this.$(IS_PLAYING).length, 1, 'Is playing');
  this.$(PIANO_KEY).trigger('mouseleave');
  assert.equal(this.$(IS_PLAYING).length, 0, 'Stopped playing');
});

test('Shows notename for C notes', function(assert) {
  assert.expect(2);

  const noteName = 'foo';
  this.set('numberInOctave', 0);
  this.set('noteName', noteName);
  this.render(hbs`{{piano-key numberInOctave=numberInOctave noteName=noteName}}`);

  assert.equal(this.$(NOTE_NAME).length, 1, 'See note name');

  this.set('numberInOctave', 4);
  assert.equal(this.$(NOTE_NAME).length, 0, 'No more note name');
});
