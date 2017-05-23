import Mixin from 'ember-metal/mixin'
import set from 'ember-metal/set';
import get from 'ember-metal/get';

// Keep track of our event listening functions so we can remove them later.
let keyDownFunc = null;
let keyUpFunc = null;
let touchMoveFunc = null;
let touchStartFunc = null;
let touchEndFunc = null;

/**
 * Add this mixin to a component to listen to events that happen on the window.
 *
 * The mixin provides the following hooks:
 *
 * * `didWindowKeyDown`
 * * `didWindowKeyUp`
 * * `didTouchEnter`
 * * `didTouchLeave`
 * * `didTouchStart`
 * * `didTouchEnd`
 */
export default Mixin.create({
  /**
   * If the user is touching the element
   */
  isTouched: false,

  /**
   * Listen to the window events once the element is created
   */
  didInsertElement() {
    this._super(...arguments);
    this._listenToKeyEvents();
    this._listenToTouchEvents();
  },

  /**
   * Stop listening when the element will be destroyed
   */
  willDestroyElement() {
    this._super(...arguments);
    this._removeEventListener('keydown', this._getKeyDownFunc());
    this._removeEventListener('keyup', this._getKeyUpFunc());
    this._removeEventListener('touchmove', this._getTouchMoveFunc());
    this._removeEventListener('touchstart', this._getTouchStartFunc());
    this._removeEventListener('touchend', this._getTouchEndFunc());
  },

  _listenToKeyEvents() {
    keyDownFunc = evt => { this.didWindowKeyDown(evt); };
    keyUpFunc = evt => { this.didWindowKeyUp(evt); };
    this._addEventListener('keydown', this._getKeyDownFunc());
    this._addEventListener('keyup', this._getKeyUpFunc());
  },

  _listenToTouchEvents() {
    // If the x and y coordinates of the touch are inside the element than we know that the user
    // is touching the element
    touchMoveFunc = ({ changedTouches }) => {
      const { clientX, clientY } = changedTouches[0];
      const isTouched = get(this, 'isTouched');

      if (this._isInsideElement(clientX, clientY)) {
        this.didTouchEnter();
        set(this, 'isTouched', true);

      // If it's not already touched we don't want to fire this, because there may be lots of
      // touches happening outide the element that didn't originate inside this one
      } else if (isTouched) {
        this.didTouchLeave();
        set(this, 'isTouched', false);
      }
    };

    // Fire touch start if the touch starts inside the element
    touchStartFunc = ({ changedTouches }) => {
      const { clientX, clientY } = changedTouches[0];
      if (this._isInsideElement(clientX, clientY)) {
        this.didTouchStart();
        set(this, 'isTouched', true);
      }
    };

    // Fire touch end if the touch ends inside the element
    touchEndFunc = ({ changedTouches }) => {
      const { clientX, clientY } = changedTouches[0];
      if (this._isInsideElement(clientX, clientY)) {
        this.didTouchEnd();
        set(this, 'isTouched', false);
      }
    };

    this._addEventListener('touchmove', this._getTouchMoveFunc());
    this._addEventListener('touchstart', this._getTouchStartFunc());
    this._addEventListener('touchend', this._getTouchEndFunc());
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
   * Proxy for testing
   */
  _getTouchEndFunc() {
    return touchEndFunc;
  },

  /**
   * Proxy for testing
   */
  _getTouchMoveFunc() {
    return touchMoveFunc;
  },

  /**
   * Proxy for testing
   */
  _getTouchStartFunc() {
    return touchStartFunc;
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
   * Figure out if the user is touching an element
   */
  _isInsideElement(x, y) {
    return this._elementFromPoint(x, y) === this.$()[0];
  },

  /**
   * Proxy to DOM api
   */
  _elementFromPoint(x, y) {
    return document.elementFromPoint(x, y);
  },

  /**
   * Override this to listen to when there's a keydown on the window. Will be passed event object.
   */
  didWindowKeyDown() {},

  /**
   * Override this to listen to when there's a keyup on the window. Will be passed event object.
   */
  didWindowKeyUp() {},

  /**
   * Override this to listen to when the user touches into the element
   */
  didTouchEnter() {},

  /**
   * Override this to listen to when the users finger leave the element
   */
  didTouchLeave() {},

  /**
   * Override this to listen to when the user starts touching the element
   */
  didTouchStart() {},

  /**
   * Override this to listen to when the user stops touching the element
   */
  didTouchEnd() {},
});
