export function event(obj, type, callback, args=null, origEvent=null) {

  let events = data.plot.core.events

  if (type == "click") {

    events.addEventListener(obj, "click", function(event) {

      eventLogic(callback, args, origEvent, event.origDomEvent)

    }, false)

  } else if (type == "dblclick") {

    events.addEventListener(obj, "dblclick", function(event) {

      eventLogic(callback, args, origEvent, event.origDomEvent)

    }, false)

  } else if (type == "contextmenu") {

    events.addEventListener(obj, "contextmenu", function(event) {

      eventLogic(callback, args, origEvent, event.origDomEvent)

    }, false)

  } else if (type == "mousedown") {

    events.addEventListener(obj, "mousedown", function(event) {

      eventLogic(callback, args, origEvent, event.origDomEvent)

    }, false)

  } else if (type == "mouseup") {

    events.addEventListener(obj, "mouseup", function(event) {

      eventLogic(callback, args, origEvent, event.origDomEvent)

    }, false)

  } else if (type == "mouseover") {

    events.addEventListener(obj, "mouseover", function(event) {

      eventLogic(callback, args, origEvent, event.origDomEvent)

    }, false)

  } else if (type == "mouseout") {

    events.addEventListener(obj, "mouseout", function(event) {

      eventLogic(callback, args, origEvent, event.origDomEvent)

    }, false)

  }

}

function eventLogic(callback, args, origEvent, origDomEvent) {

  if (args && origEvent) {

    callback(args, origDomEvent)

  } else if (args) {

    callback(args)

  } else {

    callback()

  }

}
