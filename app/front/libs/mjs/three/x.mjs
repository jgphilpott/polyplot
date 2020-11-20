export function event(obj, type, callback, args=null) {

  let events = data.plot.core.events

  if (type == "click") {

    events.addEventListener(obj, "click", function(event) {

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  } else if (type == "dblclick") {

    events.addEventListener(obj, "dblclick", function(event) {

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  } else if (type == "contextmenu") {

    events.addEventListener(obj, "contextmenu", function(event) {

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  } else if (type == "mousedown") {

    events.addEventListener(obj, "mousedown", function(event) {

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  } else if (type == "mouseup") {

    events.addEventListener(obj, "mouseup", function(event) {

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  } else if (type == "mouseover") {

    events.addEventListener(obj, "mouseover", function(event) {

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  } else if (type == "mouseout") {

    events.addEventListener(obj, "mouseout", function(event) {

      if (args) {
        callback(args)
      } else {
        callback()
      }

    }, false)

  }

}
