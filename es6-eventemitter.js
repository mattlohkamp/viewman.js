 //  adapted from Dave Atchley: http://www.datchley.name/es6-eventemitter/

'use strict'

class CustomEvent {
  constructor(type, target){
    this.type = type
    this.target = target
    this.defaultPrevented = false
  }
  preventDefault() {  this.defaultPrevented = true  }
}

class CustomEventListener {
  constructor(label, callback, once=false){
    this.label = label
    this.callback = callback
    this.once = once
  }
}

class EventEmitter {
  constructor() { this.listeners = new Map() }
  addEventListener(label, callback, once=false) {
    this.listeners.has(label) || this.listeners.set(label, [])
    this.listeners.get(label).push(new CustomEventListener(label, callback, once))
  }
  removeEventListener(label, callback) {
      let listeners = this.listeners.get(label),
          index

      if (listeners && listeners.length) {
          index = listeners.reduce((i, listener, index)=>(typeof obj == 'function' && listener.callback === callback) ? i = index : i, -1)
          if (index > -1) {
              listeners.splice(index, 1)
              this.listeners.set(label, listeners)
              return true
          }
      }
      return false
  }
  dispatchEvent(label, ...args) {
      let listeners = this.listeners.get(label)
      let e = new CustomEvent(label,this)
      if (listeners && listeners.length) {
          listeners.forEach(listener=>{
            listener.callback(e, ...args)
            if(listener.once == true) listeners.splice(listeners.indexOf(listener), 1)
          })
          return e
      }
      return false
  }
}
