import {min, max, width, height} from "../env/window.mjs"

export function addPerspectiveCamera(fov=75, near=(max / 1000), far=(max * 10)) {

  let camera = new THREE.PerspectiveCamera(fov, width() / height(), near, far)

  camera.position.set(max, max, max)
  camera.up.set(0, 1, 0)

  camera.target = {x: min, y: min, z: min}
  camera.lookAt(camera.target.x, camera.target.y, camera.target.z)

  return camera

}