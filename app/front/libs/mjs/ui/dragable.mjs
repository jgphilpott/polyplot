export function makeDragable(element) {

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

    element.css("cursor", "grabbing")

    if (element[0].id == "minCap" || element[0].id == "point" || element[0].id == "maxCap") {

      element.css({left: event.clientX - xOffset})

    } else {

      element.css({top: event.clientY - yOffset, left: event.clientX - xOffset})

    }

  }

  function stop(event) {

    event.preventDefault()
    event.stopPropagation()

    if (element[0].id == "minCap" || element[0].id == "point" || element[0].id == "maxCap") {

      element.css("cursor", "ew-resize")

    } else {

      element.css("cursor", "grab")

    }

    document.onmouseup = null
    document.onmousemove = null

  }

  element.mousedown(start)

}
