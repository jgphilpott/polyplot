import {white} from "../colors/three/grayscale.mjs"
import {min, max} from "../env/dimensions.mjs"

export function newAmbientLight(color=white, intensity=1, x=max, y=max, z=max) {

  let light = new THREE.AmbientLight(color, intensity)
  light.position.set(x, y, z)
  return light

}

export function addAmbientLight(scene, color=white, intensity=1, x=max, y=max, z=max) {

  scene.add(newAmbientLight(color, intensity, x, y, z))

}
