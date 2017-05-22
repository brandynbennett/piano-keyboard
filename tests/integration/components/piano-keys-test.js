import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import { IS_SCROLLABLE } from 'piano-keyboard/tests/helpers/dom-selectors';

moduleForComponent('piano-keys', 'Integration | Component | piano keys', {
  integration: true
});

test('Scrolling can lock', function(assert) {
  assert.expect(2);
  this.set('isScrollable', true);
  this.render(hbs`{{piano-keys isScrollable=isScrollable}}`);
  assert.equal(this.$(IS_SCROLLABLE).length, 1, 'Can scroll');

  this.set('isScrollable', false);
  assert.equal(this.$(IS_SCROLLABLE).length, 0, 'Can not scroll');
});
