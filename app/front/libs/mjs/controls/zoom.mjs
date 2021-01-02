export function addZoomControls() {

  $("#canvas").on("wheel", function(event) {

    let zoomMin = 1
    let zoomMax = 500
    let zoomSpeed = 1000
    let zoomDelta = event.originalEvent.wheelDelta / zoomSpeed

    let camera = data.plot.core.camera
    let position = camera.position
    let target = camera.target

    let diffX = position.x - target.x
    let diffY = position.y - target.y
    let diffZ = position.z - target.z

    // Zoom In
    if (zoomDelta > 0) {
      if (position.distanceTo(target) >= zoomMin) { zoom() }
    }

    // Zoom Out
    else if (zoomDelta < 0) {
      if (position.distanceTo(target) <= zoomMax) { zoom() }
    }

    function zoom() {

      position.x -= diffX * zoomDelta
      position.y -= diffY * zoomDelta
      position.z -= diffZ * zoomDelta

    }

  })

}
