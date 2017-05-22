import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import td from 'testdouble';
import { MODE_SWITCHER, MODE_INDICATOR, IS_ACTIVE } from 'piano-keyboard/tests/helpers/dom-selectors';

const { verify } = td;

moduleForComponent('controls/mode-switcher', 'Integration | Component | controls/mode switcher', {
  integration: true,

  beforeEach() {
    this.modes = [
      {
        displayName: 'Glissando',
        value: 'GLISSANDO',
      },
      {
        displayName: 'Scroll',
        value: 'SCROLL',
      },
    ];
    this.set('modes', this.modes);
  },
});

test('It displays first mode by default', function(assert) {
  assert.expect(1);

  this.render(hbs`{{controls/mode-switcher modes=modes}}`);

  assert.equal(this.$().text().trim(), this.modes[0].displayName);
});

test('It displays selected mode if chosen', function(assert) {
  assert.expect(1);
  this.set('selectedMode', 'SCROLL');

  this.render(hbs`{{controls/mode-switcher modes=modes selectedValue=selectedMode}}`);

  assert.equal(this.$().text().trim(), this.modes[1].displayName);
});

test('It fires an action when mode is changed', function(assert) {
  assert.expect(2);
  const switchDouble = td.func();
  this.set('onSwitch', switchDouble);

  this.render(hbs`{{controls/mode-switcher modes=modes onSwitch=onSwitch}}`);

  this.$(MODE_SWITCHER).click();
  assert.equal(verify(switchDouble(this.modes[1])), undefined);
  assert.equal(this.$().text().trim(), this.modes[1].displayName);
});

test('It displays indicators', function(assert) {
  assert.expect(2);
  const IS_ACTIVE_CLASS_NAME = IS_ACTIVE.replace('.', '');

  this.render(hbs`{{controls/mode-switcher modes=modes}}`);
  assert.ok(this.$(MODE_INDICATOR).eq(0).hasClass(IS_ACTIVE_CLASS_NAME), 'First indicator is active');
  this.$(MODE_SWITCHER).click();
  assert.ok(this.$(MODE_INDICATOR).eq(1).hasClass(IS_ACTIVE_CLASS_NAME), 'Second indicator is active');
});

test('It starts at first mode when there are no more left', function(assert) {
  assert.expect(1);

  this.render(hbs`{{controls/mode-switcher modes=modes}}`);
  this.$(MODE_SWITCHER).click();
  this.$(MODE_SWITCHER).click();
  assert.equal(this.$().text().trim(), this.modes[0].displayName);
});
