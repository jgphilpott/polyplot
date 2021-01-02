export function addZoomControls() {

  $("#canvas").on("wheel", function(event) {

    let zoomMin = 1
    let zoomMax = 500
    let zoomSpeed = 1000
    let zoomDelta = event.originalEvent.wheelDelta / zoomSpeed

    let camera = data.plot.core.camera
    let position = camera.position
    let target = camera.target

    let deltaX = position.x - target.x
    let deltaY = position.y - target.y
    let deltaZ = position.z - target.z

    // Zoom In
    if (zoomDelta > 0) {
      if (position.distanceTo(target) >= zoomMin) { zoom() }
    }

    // Zoom Out
    else if (zoomDelta < 0) {
      if (position.distanceTo(target) <= zoomMax) { zoom() }
    }

    function zoom() {

      position.x -= deltaX * zoomDelta
      position.y -= deltaY * zoomDelta
      position.z -= deltaZ * zoomDelta

    }

  })

}
