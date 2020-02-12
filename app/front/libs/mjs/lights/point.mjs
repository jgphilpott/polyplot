import {white} from "../colors/three/grayscale.mjs"

export function newPointLight(color=white, intensity=1, x=100, y=100, z=100) {

  let light = new THREE.PointLight(color, intensity)
  light.position.set(x, y, z)
  return light

}
