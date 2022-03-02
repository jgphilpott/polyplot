export function addDragControls(speed=10) {

  let radius3 = null
  let startX, startY = null
  let horizontalAngle, verticalAngle = null

  let camera = data.plot.core.camera
  let position = camera.position
  let target = camera.target

  function start(event) {

    event.preventDefault()
    event.stopPropagation()

    startX = event.pageX
    startY = event.pageY

    let deltaX = Math.abs(position.x - target.x)
    let deltaY = Math.abs(position.y - target.y)
    let deltaZ = Math.abs(position.z - target.z)

    radius3 = position.distanceTo(target)
    let radius2 = side4sides(deltaY, null, radius3)

    horizontalAngle = angle4sides(radius2, deltaZ)
    if (position.z < target.z) { horizontalAngle = 180 - horizontalAngle }
    if (position.x < target.x) { horizontalAngle = -horizontalAngle }

    verticalAngle = angle4sides(radius3, deltaY)
    if (position.y < target.y) { verticalAngle = 180 - verticalAngle }

    document.onmousemove = drag
    document.onmouseup = stop

  }

  function drag(event) {

    event.preventDefault()
    event.stopPropagation()

    let radius2 = side4sides(Math.abs(position.y - target.y), null, radius3)

    let newHorizontalAngle = horizontalAngle + ((startX - event.pageX) / speed)
    if (newHorizontalAngle >= 180) { newHorizontalAngle = newHorizontalAngle - 360 }

    let newVerticalAngle = verticalAngle + ((startY - event.pageY) / speed)
    if (newVerticalAngle <= 0) { newVerticalAngle = 0.000001 } else if (newVerticalAngle >= 180) { newVerticalAngle = -180 - 0.000001 }

    let newX = side4angle(newHorizontalAngle, radius2, null, true) + target.x
    let newY = side4angle(newVerticalAngle, radius3, true, null) + target.y
    let newZ = side4angle(newHorizontalAngle, radius2, true, null) + target.z

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