import {addPerspectiveCamera} from "./perspective.mjs"

let plot = data.plot

export function addCamera() {

  let camera = addPerspectiveCamera()

  return camera

}

export function lookHere(obj, duration=1000, steps=100) {

  let camera = plot.core.camera

  let x = plot.x.scale(obj.x.find(date => date.year == plot.t.year).value)
  let y = plot.y.scale(obj.y.find(date => date.year == plot.t.year).value)
  let z = plot.z.scale(obj.z.find(date => date.year == plot.t.year).value)

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
