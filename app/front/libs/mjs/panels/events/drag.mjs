export function makeDragable(element, events=[]) {

  let xOffset, yOffset = 0

  function start(event) {

    event.preventDefault()
    event.stopPropagation()

    if (element.css("transform") != "none") {

      let translation = element.css("transform").replace(/[{()}]/g, "").replace(/[a-zA-Z]/g, "").split(",")

      xOffset = event.clientX - element.position().left + Number(translation[4])
      yOffset = event.clientY - element.position().top + Number(translation[5])

    } else {

      xOffset = event.clientX - element.position().left
      yOffset = event.clientY - element.position().top

    }

    document.onmousemove = drag
    document.onmouseup = stop

  }

  function drag(event) {

    event.preventDefault()
    event.stopPropagation()

    let eventX = event.clientX - xOffset
    let eventY = event.clientY - yOffset

    element.css("cursor", "grabbing")

    if (element.hasClass("controller")) {

      events[0](element, [eventX, eventY])

    } else if (element.hasClass("panel")) {

      element.css({"top": eventY, "left": eventX})

    }

  }

  function stop(event) {

    event.preventDefault()
    event.stopPropagation()

    if (element.hasClass("controller")) {

      events[1](0)

      element.css("cursor", "ew-resize")

    } else if (element.hasClass("panel")) {

      element.css("cursor", "grab")

    }

    document.onmouseup = null
    document.onmousemove = null

  }

  element.mousedown(start)

}
