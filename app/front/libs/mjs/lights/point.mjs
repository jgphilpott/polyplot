import {white} from "../colors/three/grayscale.mjs"
import {min, max} from "../env/dimensions.mjs"

export function newPointLight(color=white, intensity=1, x=max, y=max, z=max) {

  let light = new THREE.PointLight(color, intensity)
  light.position.set(x, y, z)
  return light

}

export function addPointLight(scene, color=white, intensity=1, x=max, y=max, z=max) {

  scene.add(newPointLight(color, intensity, x, y, z))

}
