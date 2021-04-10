export function event(obj, type, callback, args=null, origEvent=null) {

  let events = data.plot.core.events

  events.addEventListener(obj, type, function(event) {

    eventLogic(callback, args, origEvent, event.origDomEvent)

  }, false)

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
