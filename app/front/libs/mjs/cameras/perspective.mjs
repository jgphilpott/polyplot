import {min, max} from "../env/dimensions.mjs"

export function newPerspectiveCamera(width, height, fov=75, near=(max / 1000), far=(max * 10), x=max, y=max, z=max) {

  let camera = new THREE.PerspectiveCamera(fov, width / height, near, far)
  camera.position.set(x, y, z)
  return camera

}
