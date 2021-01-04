export function focus(obj, duration=1000, steps=100) {

  let camera = data.plot.core.camera
  let position = camera.position
  let target = camera.target

  let plot = data.plot
  let x, y, z = null

  if (obj.x && obj.y && obj.z) {

    x = plot.x.scale(obj.x.find(date => date.year == plot.t.year).value)
    y = plot.y.scale(obj.y.find(date => date.year == plot.t.year).value)
    z = plot.z.scale(obj.z.find(date => date.year == plot.t.year).value)

  } else {

    x = obj.position.x
    y = obj.position.y
    z = obj.position.z

  }

  let deltaX = x - target.x
  let deltaY = y - target.y
  let deltaZ = z - target.z

  let stepX = deltaX / steps
  let stepY = deltaY / steps
  let stepZ = deltaZ / steps

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
