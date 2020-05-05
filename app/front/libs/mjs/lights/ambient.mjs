import {white} from "../colors/three/grayscale.mjs"
import {min, max} from "../env/window.mjs"

export function newAmbientLight(color=white, intensity=1, x=min, y=min, z=min) {

  let light = new THREE.AmbientLight(color, intensity)
  light.position.set(x, y, z)
  return light

}

export function addAmbientLight(color=white, intensity=1, x=min, y=min, z=min) {

  return data.plot.core.scene.add(newAmbientLight(color, intensity, x, y, z))

}
