export function makeDragable(element) {

  let xOffset = 0, yOffset = 0

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
    element.css({top: event.clientY - yOffset, left: event.clientX - xOffset})

  }

  function stop(event) {

    event.preventDefault()
    event.stopPropagation()

    element.css("cursor", "grab")

    document.onmouseup = null
    document.onmousemove = null

  }

  element.mousedown(start)

}
