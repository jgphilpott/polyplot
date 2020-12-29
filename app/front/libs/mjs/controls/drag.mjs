export function addDragControls() {

  let camera = data.plot.core.camera

  let dragSpeed = 7
  let hypotenuseXY, hypotenuseYZ, angleXY, angleYZ, startX, startY = null

  function start(event) {

    event.preventDefault()
    event.stopPropagation()

    startX = event.pageX
    startY = event.pageY

    let diffX = Math.abs(camera.position.x - camera.target.x)
    let diffY = Math.abs(camera.position.y - camera.target.y)
    let diffZ = Math.abs(camera.position.z - camera.target.z)

    hypotenuseXY = side4sides(diffX, diffY)
    hypotenuseYZ = side4sides(diffY, diffZ)

    angleXY = angle4sides(hypotenuseXY, diffX)
    if (camera.position.x < camera.target.x) { angleXY = 180 - angleXY }
    if (!(camera.position.y > camera.target.y)) { angleXY = -angleXY }

    angleYZ = angle4sides(hypotenuseYZ, diffZ)
    if (camera.position.z < camera.target.z) { angleYZ = 180 - angleYZ }

    document.onmousemove = drag
    document.onmouseup = stop

  }

  function drag(event) {

    event.preventDefault()
    event.stopPropagation()

    let newAngleXY = angleXY + ((startX - event.pageX) / dragSpeed)
    if (newAngleXY >= 180) { newAngleXY = newAngleXY - 360 }

    let newAngleYZ = angleYZ + ((startY - event.pageY) / dragSpeed)
    if (newAngleYZ <= 0) { newAngleYZ = 0 } else if (newAngleYZ >= 180) { newAngleYZ = -180 }

    let newX = side4angle(newAngleXY, hypotenuseXY, true, null)
    let newY = side4angle(newAngleXY, hypotenuseXY, null, true)
    let newZ = side4angle(newAngleYZ, hypotenuseYZ, true, null)

    camera.position.set(newX, newY, newZ)
    camera.lookAt(camera.target.x, camera.target.y, camera.target.z)

  }

  function stop(event) {

    event.preventDefault()
    event.stopPropagation()

    document.onmouseup = null
    document.onmousemove = null

  }

  $("#canvas").mousedown(start)

}
