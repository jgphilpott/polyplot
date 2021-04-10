export function addZoomControls(min=1, max=500, speed=1000) {

  $("#canvas").on("wheel", function(event) {

    let delta = event.originalEvent.wheelDelta / speed

    let camera = data.plot.core.camera
    let position = camera.position
    let target = camera.target

    let stepX = position.x - target.x
    let stepY = position.y - target.y
    let stepZ = position.z - target.z

    // Zoom In
    if (delta > 0) {
      if (position.distanceTo(target) >= min) { zoom() }
    }

    // Zoom Out
    else if (delta < 0) {
      if (position.distanceTo(target) <= max) { zoom() }
    }

    function zoom() {

      position.x -= stepX * delta
      position.y -= stepY * delta
      position.z -= stepZ * delta

    }

  })

}
