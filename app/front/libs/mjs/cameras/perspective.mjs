import {min, max, width, height} from "../env/dimensions.mjs"

export function newPerspectiveCamera(fov=75, near=(max / 1000), far=(max * 10), x=max, y=max, z=max) {

  let camera = new THREE.PerspectiveCamera(fov, width() / height(), near, far)
  camera.position.set(x, y, z)
  return camera

}
