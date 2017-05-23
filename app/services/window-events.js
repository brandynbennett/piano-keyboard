import Service from 'ember-service';
import set from 'ember-metal/set';

let mouseDownFunc = null;
let mouseUpFunc = null;

/**
 * This service provides data about events happening on the `window`. You can look at the
 * `isMouseDown` property to tell if the user is pressing the mouse down anywhere on the screen
 */
export default Service.extend({
  /**
   * Whether or not the mouse is down somewhere on the window
   */
  isMouseDown: false,

  init() {
    this._super(...arguments);
    this._listenToMouseEvents();
  },

  willDestroy() {
    this._removeEventListener('mousedown', this._getMouseDownFunc());
    this._removeEventListener('mouseup', this._getMouseUpFunc());
  },

  _listenToMouseEvents() {
    mouseDownFunc = () => { set(this, 'isMouseDown', true); };
    mouseUpFunc = () => { set(this, 'isMouseDown', false); };
    this._addEventListener('mousedown', this._getMouseDownFunc());
    this._addEventListener('mouseup', this._getMouseUpFunc());
  },

  /**
   * Proxy for testing
   */
  _getMouseDownFunc() {
    return mouseDownFunc;
  },

  /**
   * Proxy for testing
   */
  _getMouseUpFunc() {
    return mouseUpFunc;
  },

  /**
   * Proxy to DOM api
   */
  _addEventListener(event, func) {
    window.addEventListener(event, func, false);
  },

  /**
   * Proxy to DOM api
   */
  _removeEventListener(event, func) {
    window.removeEventListener(event, func, false);
  },
});
