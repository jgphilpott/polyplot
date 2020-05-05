import {min, max, width, height} from "../env/window.mjs"

export function addPerspectiveCamera(fov=75, near=(max / 1000), far=(max * 10), x=max, y=max, z=max) {

  let camera = new THREE.PerspectiveCamera(fov, width() / height(), near, far)
  camera.position.set(x, y, z)
  return camera

}
