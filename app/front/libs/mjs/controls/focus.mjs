export function focus(obj, duration=1000, steps=100) {

  let x, y, z = null

  let plot = data.plot
  let camera = plot.core.camera

  if (obj.x && obj.y && obj.z) {

    x = plot.x.scale(obj.x.find(date => date.year == plot.t.year).value)
    y = plot.y.scale(obj.y.find(date => date.year == plot.t.year).value)
    z = plot.z.scale(obj.z.find(date => date.year == plot.t.year).value)

  } else {

    x = obj.position.x
    y = obj.position.y
    z = obj.position.z

  }

  let diffX = x - camera.target.x
  let diffY = y - camera.target.y
  let diffZ = z - camera.target.z

  let stepX = diffX / steps
  let stepY = diffY / steps
  let stepZ = diffZ / steps

  for (let i = 1; i <= steps; i++) {

    setTimeout(updateCameraTarget, (duration / steps) * i)

  }

  function updateCameraTarget() {

    camera.target.x += stepX
    camera.target.y += stepY
    camera.target.z += stepZ

    camera.lookAt(camera.target.x, camera.target.y, camera.target.z)

  }

}
