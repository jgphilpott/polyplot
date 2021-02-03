export function focus(obj, duration=1000, steps=100) {

  let camera = data.plot.core.camera
  let position = camera.position
  let target = camera.target

  let stepX = (obj.position.x - target.x) / steps
  let stepY = (obj.position.y - target.y) / steps
  let stepZ = (obj.position.z - target.z) / steps

  for (let i = 1; i <= steps; i++) {

    setTimeout(updateCameraTarget, (duration / steps) * i)

  }

  function updateCameraTarget() {

    target.x += stepX
    target.y += stepY
    target.z += stepZ

    camera.lookAt(target.x, target.y, target.z)

  }

}
