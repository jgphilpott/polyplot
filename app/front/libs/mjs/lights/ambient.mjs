import {white} from "../colors/three/grayscale.mjs"

export function newAmbientLight(color=white, intensity=1, x=0, y=0, z=0) {

  let light = new THREE.AmbientLight(color, intensity)
  light.position.set(x, y, z)
  return light

}
