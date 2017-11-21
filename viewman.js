'use strict'

class ViewMan {
  constructor(classNames) {
    this.classNames = classNames
  }
  toView(viewClassName){
    this.classNames.forEach(className=>{
      Array.from(document.getElementsByClassName(className)).forEach(element=>{
        element.style.display = (className == viewClassName) ? null : 'none'
      })
    })
  }
}
