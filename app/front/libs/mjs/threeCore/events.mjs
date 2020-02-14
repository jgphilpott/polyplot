export function xEvents(camera, renderer) {

  return new THREEx.DomEvents(camera, renderer.domElement)

}

export function xEvent(dom, obj, type, callback, args=null) {

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
