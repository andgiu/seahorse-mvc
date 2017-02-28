/**
 * Custom event broadcaster inspired by Miller Medeiros Signals.
 * @name Signal
 * @author Andrea Giuffrida
 * @constructor
 */

import SignalBinding from './SignalBinding';

export default class Signal {

  constructor(...args) {

    /**
     * @type boolean
     * @private
     */
    this._shouldPropagate = true;

    /**
     * @private
     */
    this._prevParams = null;

    /**
    * @type Array.<SignalBinding>
    * @private
    */
    this._bindings = [];


    /**
     * Set whether a Signal is active or not
     * @type boolean
     */
    this.active = true;

    /**
     * If Signal should keep record of previously dispatched parameters and
     * automatically execute listener during `add()`/`addOnce()` if Signal was
     * already dispatched before.
     * @type boolean
     */
    this.memorize = false;

  }

  /**
   * Register a listener event into the Signal
   * @param {Function} listener
   * @param {boolean} isOnce
   * @param {Object} [listenerContext]
   * @param {Number} [priority]
   * @return {SignalBinding}
   * @private
   */
  _registerListener(listener, isOnce, listenerContext, priority) {

    let
    prevIndex = this._indexOfListener(listener, listenerContext),
    binding;

    if (prevIndex !== -1) {
        binding = this._bindings[prevIndex];
        if (binding.isOnce() !== isOnce) {
            throw new Error('You cannot add'+ (isOnce? '' : 'Once') +'() then add'+ (!isOnce? '' : 'Once') +'() the same listener without removing the relationship first.');
        }
    } else {
        binding = new SignalBinding(this, listener, isOnce, listenerContext, priority);
        this._addBinding(binding);
    }

    if(this.memorize && this._prevParams){
        binding.execute(this._prevParams);
    }

    return binding;

  }

  /**
   * @param {SignalBinding} binding
   * @private
   */
  _addBinding(binding) {
      //simplified insertion sort
      let n = this._bindings.length;
      do { --n; } while (this._bindings[n] && binding._priority <= this._bindings[n]._priority);
      this._bindings.splice(n + 1, 0, binding);
  }

  /**
   * @param {Function} listener
   * @return {number}
   * @private
   */
  _indexOfListener(listener, context) {
      var n = this._bindings.length,
          cur;
      while (n--) {
          cur = this._bindings[n];
          if (cur._listener === listener && cur.context === context) {
              return n;
          }
      }
      return -1;
  }

  /**
   * Add a listener to the signal.
   * @param {Function} listener Signal handler function.
   * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
   * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
   * @return {SignalBinding} An Object representing the binding between the Signal and listener.
   */
  add(listener, listenerContext, priority) {
      return this._registerListener(listener, false, listenerContext, priority);
  }

  /**
   * Add listener to the signal that should be removed after first execution (will be executed only once).
   * @param {Function} listener Signal handler function.
   * @param {Object} [listenerContext] Context on which listener will be executed (object that should represent the `this` variable inside listener function).
   * @param {Number} [priority] The priority level of the event listener. Listeners with higher priority will be executed before listeners with lower priority. Listeners with same priority level will be executed at the same order as they were added. (default = 0)
   * @return {SignalBinding} An Object representing the binding between the Signal and listener.
   */
  addOnce(listener, listenerContext, priority) {
      return this._registerListener(listener, true, listenerContext, priority);
  }

  /**
   * Remove a single listener from the dispatch queue.
   * @param {Function} listener Handler function that should be removed.
   * @param {Object} [context] Execution context (since you can add the same handler multiple times if executing in a different context).
   * @return {Function} Listener handler function.
   */
  remove(listener, context) {
      var i = this._indexOfListener(listener, context);
      if (i !== -1) {
          this._bindings[i]._destroy(); //no reason to a SignalBinding exist if it isn't attached to a signal
          this._bindings.splice(i, 1);
      }
      return listener;
  }

  /**
   * Remove all listeners from the Signal.
   */
  removeAll() {
      var n = this._bindings.length;
      while (n--) {
          this._bindings[n]._destroy();
      }
      this._bindings.length = 0;
  }

  /**
   * @return {number} Number of listeners attached to the Signal.
   */
  getNumListeners() {
      return this._bindings.length;
  }

  /**
   * Stop propagation of the event, blocking the dispatch to next listeners on the queue.
   */
  halt() {
      this._shouldPropagate = false;
  }

  /**
   * Dispatch/Broadcast Signal to all listeners added to the queue.
   * @param {...*} [params] Parameters that should be passed to each handler.
   */
  dispatch(params) {
      if (! this.active) {
          return;
      }

      var paramsArr = Array.prototype.slice.call(arguments),
          n = this._bindings.length,
          bindings;

      if (this.memorize) {
          this._prevParams = paramsArr;
      }

      if (! n) {
          //should come after memorize
          return;
      }

      bindings = this._bindings.slice(); //clone array in case add/remove items during dispatch
      this._shouldPropagate = true; //in case `halt` was called before dispatch or during the previous dispatch.

      //execute all callbacks until end of the list or until a callback returns `false` or stops propagation
      //reverse loop since listeners with higher priority will be added at the end of the list
      do { n--; } while (bindings[n] && this._shouldPropagate && bindings[n].execute(paramsArr) !== false);
  }

  /**
   * Forget memorized arguments.
   * @see Signal.memorize
   */
  forget(){
      this._prevParams = null;
  }

  /**
   * Remove all bindings from signal and destroy any reference to external objects (destroy Signal object).
   */
  dispose() {
      this.removeAll();
      delete this._bindings;
      delete this._prevParams;
  }

  /**
   * @return {string} String representation of the object.
   */
  toString() {
      return '[Signal active:'+ this.active +' numListeners:'+ this.getNumListeners() +']';
  }

}
