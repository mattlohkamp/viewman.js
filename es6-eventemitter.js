'use strict'; //  adapted from Dave Atchley: http://www.datchley.name/es6-eventemitter/

class CustomEvent {
  constructor(type,target){
    this.type = type
    this.target = target
    this.defaultPrevented = false
  }
  preventDefault() {
    this.defaultPrevented = true
  }
}

class EventEmitter {
  constructor() { this.listeners = new Map(); }
  addEventListener(label, callback) {
    this.listeners.has(label) || this.listeners.set(label, []);
    this.listeners.get(label).push(callback);
  }
  removeEventListener(label, callback) {
      let listeners = this.listeners.get(label),
          index;

      if (listeners && listeners.length) {
          index = listeners.reduce((i, listener, index) => {
              return (typeof obj == 'function' && listener === callback) ?
                  i = index :
                  i;
          }, -1);

          if (index > -1) {
              listeners.splice(index, 1)
              this.listeners.set(label, listeners)
              return true
          }
      }
      return false
  }
  emitEvent(label, ...args) {
      let listeners = this.listeners.get(label);
      let e = new CustomEvent(label,this)
      if (listeners && listeners.length) {
          listeners.forEach((listener) => {
              listener(e, ...args)
          });
          return e
      }
      return false
  }
}
