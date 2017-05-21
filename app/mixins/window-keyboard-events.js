import Mixin from 'ember-metal/mixin'

// Keep track of our event listening functions so we can remove them later.
let keyDownFunc = null;
let keyUpFunc = null;

export default Mixin.create({
  /**
   * Listen to the window events once the element is created
   */
  didInsertElement() {
    this._super(...arguments);
    keyDownFunc = evt => { this.didWindowKeyDown(evt); };
    keyUpFunc = evt => { this.didWindowKeyUp(evt); };
    this._addEventListener('keydown', this._getKeyDownFunc());
    this._addEventListener('keyup', this._getKeyUpFunc());
  },

  /**
   * Stop listening when the element will be destroyed
   */
  willDestroyElement() {
    this._super(...arguments);
    this._removeEventListener('keydown', this._getKeyDownFunc());
    this._removeEventListener('keyup', this._getKeyUpFunc());
  },

  /**
   * Proxy for testing
   */
  _getKeyDownFunc() {
    return keyDownFunc;
  },

  /**
   * Proxy for testing
   */
  _getKeyUpFunc() {
    return keyUpFunc;
  },

  /**
   * Proxy to DOM api
   */
  _addEventListener(event, func) {
    window.addEventListener(event, func);
  },

  /**
   * Proxy to DOM api
   */
  _removeEventListener(event, func) {
    window.removeEventListener(event, func);
  },

  /**
   * Override this to listen to when there's a keydown on the window. Will be passed event object.
   */
  didWindowKeyDown() {},

  /**
   * Override this to listen to when there's a keyup on the window. Will be passed event object.
   */
  didWindowKeyUp() {},
});
