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

    if (element.hasClass("controller")) {

      let minOffset = 110
      let maxOffset = 540

      if (element[0].id == "minCap") {

        if (event.clientX - xOffset >= minOffset) {

          element.css({"left": event.clientX - xOffset})

        }

      } else if (element[0].id == "point") {

        element.css({"left": event.clientX - xOffset})

        $("#year").css({"left": event.clientX - xOffset})

      } else if (element[0].id == "maxCap") {

        if (event.clientX - xOffset <= maxOffset) {

          element.css({"left": event.clientX - xOffset})

        }

      }

    } else if (element.hasClass("panel")) {

      element.css({"top": event.clientY - yOffset, "left": event.clientX - xOffset})

    }

  }

  function stop(event) {

    event.preventDefault()
    event.stopPropagation()

    if (element.hasClass("controller")) {

      element.css("cursor", "ew-resize")

    } else {

      element.css("cursor", "grab")

    }

    document.onmouseup = null
    document.onmousemove = null

  }

  element.mousedown(start)

}
