import {addTimeEvents} from "../panels/time.mjs"

export function xEvent(obj, type, callback, args=null) {

  let dom = data.plot.core.dom

  if (type == "click") {

    dom.addEventListener(obj, "click", function(event){

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  } else if (type == "dblclick") {

    dom.addEventListener(obj, "dblclick", function(event){

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  } else if (type == "mousedown") {

    dom.addEventListener(obj, "mousedown", function(event){

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  } else if (type == "mouseup") {

    dom.addEventListener(obj, "mouseup", function(event){

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  } else if (type == "mouseover") {

    dom.addEventListener(obj, "mouseover", function(event){

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  } else if (type == "mouseout") {

    dom.addEventListener(obj, "mouseout", function(event){

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  }

}

export function xEvents() {

  return new THREEx.DomEvents(data.plot.core.camera, data.plot.core.renderer.domElement)

}

export function addEventListeners() {

  data.plot.core.dom = xEvents()

  addTimeEvents()

}
