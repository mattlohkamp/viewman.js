'use strict'
const ViewManOptions = {
  init:0  //  uint, index of initial viewstate
}
class ViewMan extends EventEmitter {
  constructor(_views,_options) { super()
    this.views = _views
    for(let i = 0; i < this.views.length; i++)  { this.hide(i) }
    this.options = Object.assign(ViewManOptions, _options)
    this.currentIndex = this.options.init
    this.toView(this.currentIndex)
  }
  toView(nextIndex){
    if(this.emitEvent('viewChange').defaultPrevented != true){
        this.hide(this.currentIndex)
        this.currentIndex = nextIndex
        this.show(this.currentIndex)
      this.emitEvent('viewChanged')
    }
  }
  hide(index){  this.showhide('hide',this.views[index]) }
  show(index){  this.showhide('show',this.views[index]) }
  showhide(state,viewState){
    if(viewState instanceof HTMLElement){
      if(this.emitEvent('view'+state[0].toUpperCase() + state.slice(1)).defaultPrevented != true) viewState.style.display = (state==='show') ? null : 'none'
    }else if(viewState.length){
      viewState.forEach(view=>{
        this.showhide(state,view)
      })
    }
  }
}
