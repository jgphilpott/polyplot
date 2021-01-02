export function addDragControls() {

  let camera = data.plot.core.camera
  let position = camera.position
  let target = camera.target

  let radius3 = null
  let dragSpeed = 10
  let startX, startY = null
  let horizontalAngle, verticalAngle = null

  function start(event) {

    event.preventDefault()
    event.stopPropagation()

    startX = event.pageX
    startY = event.pageY

    radius3 = position.distanceTo(target)

    let deltaX = Math.abs(position.x - target.x)
    let deltaY = Math.abs(position.y - target.y)
    let deltaZ = Math.abs(position.z - target.z)

    let radius2 = side4sides(deltaZ, null, radius3)

    horizontalAngle = angle4sides(radius2, deltaX)
    if (position.x < target.x) { horizontalAngle = 180 - horizontalAngle }
    if (position.y < target.y) { horizontalAngle = -horizontalAngle }

    verticalAngle = angle4sides(radius3, deltaZ)
    if (position.z < target.z) { verticalAngle = 180 - verticalAngle }

    document.onmousemove = drag
    document.onmouseup = stop

  }

  function drag(event) {

    event.preventDefault()
    event.stopPropagation()

    let deltaX = Math.abs(position.x - target.x)
    let deltaY = Math.abs(position.y - target.y)
    let deltaZ = Math.abs(position.z - target.z)

    let radius2 = side4sides(deltaZ, null, radius3)

    let newHorizontalAngle = horizontalAngle + ((startX - event.pageX) / dragSpeed)
    if (newHorizontalAngle >= 180) { newHorizontalAngle = newHorizontalAngle - 360 }

    let newVerticalAngle = verticalAngle + ((startY - event.pageY) / dragSpeed)
    if (newVerticalAngle <= 0) { newVerticalAngle = 0.000001 } else if (newVerticalAngle >= 180) { newVerticalAngle = -180 - 0.000001 }

    let newX = side4angle(newHorizontalAngle, radius2, true, null) + target.x
    let newY = side4angle(newHorizontalAngle, radius2, null, true) + target.y
    let newZ = side4angle(newVerticalAngle, radius3, true, null) + target.z

    position.set(newX, newY, newZ)
    camera.lookAt(target.x, target.y, target.z)

  }

  function stop(event) {

    event.preventDefault()
    event.stopPropagation()

    document.onmouseup = null
    document.onmousemove = null

  }

  $("#canvas").mousedown(start)

}
