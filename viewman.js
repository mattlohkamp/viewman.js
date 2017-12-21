'use strict'

class ViewMan {
  constructor(viewClasses,initView) {
    this.viewClasses = viewClasses.map(className=>'.'+className)
    if(initView === undefined){
      this.toView(viewClasses[0])
    }else if(initView !== false){
      this.toView(initView)
    }
  }
  toView(viewClassName){
    Array.from(document.querySelectorAll(this.viewClasses.join(','))).forEach(viewElement=>{
      viewElement.style.display = (Array.from(viewElement.classList).indexOf(viewClassName) != -1) ? null : 'none'
    })
  }
}
