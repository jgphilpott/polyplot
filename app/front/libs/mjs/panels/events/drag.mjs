import {updateSettings} from "../menu.mjs"

export function makeDragable(element, events=[]) {

  let xOffset, yOffset = 0

  function start(event) {

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

    event.stopPropagation()
    if (!$(event.srcElement).hasClass("slider")) { event.preventDefault() }

    let eventX = event.clientX - xOffset
    let eventY = event.clientY - yOffset

    if (element.hasClass("controller")) {

      element.css("cursor", "grabbing")

      events[0](element, [eventX, eventY])

    } else if ($(event.srcElement).hasClass("slider")) {

      $(event.srcElement).css("cursor", "grabbing")

      setBackground($(".panel"), document.querySelector('#opacity.slider').value / 100)

    } else if (element.hasClass("panel")) {

      element.css("cursor", "grabbing")

      element.css({top: eventY, left: eventX})

    }

  }

  function stop(event) {

    event.stopPropagation()

    if (element.hasClass("controller")) {

      element.css("cursor", "ew-resize")

    } else if ($(event.srcElement).hasClass("slider")) {

      $(event.srcElement).css("cursor", "ew-resize")

      updateSettings("general", "opacity", document.querySelector('#opacity.slider').value / 100)

    } else if (element.hasClass("panel")) {

      element.css("cursor", "grab")

    }

    document.onmouseup = null
    document.onmousemove = null

  }

  element.mousedown(start)

}