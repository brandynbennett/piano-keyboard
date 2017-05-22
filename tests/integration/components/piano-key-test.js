import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import {
  IS_BLACK,
  PIANO_KEY,
  IS_PLAYING,
  NOTE_NAME,
  COMPUTER_KEY_BINDING,
  SR_TEXT,
} from 'piano-keyboard/tests/helpers/dom-selectors';
import { OscillatorStub } from 'piano-keyboard/tests/helpers/mocked-services';
import td from 'testdouble';

const { verify, replace } = td;

moduleForComponent('piano-key', 'Integration | Component | piano key', {
  integration: true,

  beforeEach() {
    this.register('service:oscillator', OscillatorStub);
    this.inject.service('oscillator');
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
  assert.expect(3);

  const HIDDEN_NOTE_NAME = `${NOTE_NAME}${SR_TEXT}`;
  const noteName = 'foo';
  this.set('numberInOctave', 0);
  this.set('noteName', noteName);
  this.render(hbs`{{piano-key numberInOctave=numberInOctave noteName=noteName}}`);

  assert.equal(this.$(HIDDEN_NOTE_NAME).length, 0, 'See note name');

  this.set('numberInOctave', 4);
  assert.equal(this.$(NOTE_NAME).text().trim(), noteName, 'Note nome is available to screen reader');
  assert.equal(this.$(HIDDEN_NOTE_NAME).length, 1, 'No more note name');
});

test('Shows computer key bindings if desired', function(assert) {
  assert.expect(3);

  const keyName = 'foo';
  this.set('computerKey', { keyName });
  this.set('showComputerKey', true);
  this.render(hbs`{{piano-key computerKey=computerKey showComputerKey=showComputerKey}}`);

  assert.equal(this.$(COMPUTER_KEY_BINDING).text().trim(), keyName, 'Shows binding');

  this.set('computerKey', null);
  assert.equal(this.$(COMPUTER_KEY_BINDING).length, 0, 'No binding if there is none');

  this.set('computerKey', { keyName });
  this.set('showComputerKey', false);
  assert.equal(this.$(COMPUTER_KEY_BINDING).length, 0, 'No binding if turned off');
});

test('Creates a new sound with a different wave', function(assert) {
  assert.expect(1);

  const createSoundDouble = replace(this.get('oscillator'), 'createSound');
  const freq = 'foo';
  this.set('frequency', freq);
  const waveType = 'foo';
  this.set('waveType', waveType);
  this.render(hbs`{{piano-key frequency=frequency waveType=waveType}}`);
  this.$(PIANO_KEY).trigger('mousedown');

  assert.equal(verify(createSoundDouble(freq, waveType)), undefined, 'Created sound');
});
