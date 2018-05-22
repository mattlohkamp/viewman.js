'use strict'
const ViewManOptions = {
  init:0,  //  uint, index of initial viewstate
  autoplay:true //  boolean, whether toView is immediately called at the end of instanciation
}
class ViewMan extends EventEmitter {
  constructor(_views=[],_options={}) { super()
    this.views = _views
    for(let i = 0; i < this.views.length; i++)  { this.hide(i) }
    this.options = Object.assign((_options instanceof Object) ? _options : {}, ViewManOptions)
    this.currentIndex = (Number.isInteger(this.options.init) && Math.sign(this.options.init) > -1 && this.views.length > this.options.init) ? this.options.init : ViewManOptions.init
    if(this.options.autoplay !== false)  this.toView(this.currentIndex)
  }
  toView(nextIndex){
    if(this.dispatchEvent('viewChange').defaultPrevented !== true){
        this.hide(this.currentIndex)
        this.currentIndex = nextIndex
        this.show(this.currentIndex)
      this.dispatchEvent('viewChanged')
    }
    //  return this.
  }
  hide(index){  this.showhide('hide',this.views[index]) }
  show(index){  this.showhide('show',this.views[index]) }
  showhide(state,viewState){
    if(viewState instanceof HTMLElement){
      if(this.dispatchEvent('view'+state[0].toUpperCase() + state.slice(1)).defaultPrevented != true) viewState.style.display = (state==='show') ? null : 'none'
    }else if(viewState.length){
      viewState.forEach(view=>this.showhide(state,view))
    }
  }
}
