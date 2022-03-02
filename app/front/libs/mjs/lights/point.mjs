import {white} from "../colors/three/grayscale.mjs"
import {min, max} from "../env/window.mjs"

export function newPointLight(color=white, intensity=1, x=max, y=max, z=max) {

  let light = new THREE.PointLight(color, intensity)

  light.position.set(x, y, z)

  return light

}

export function addPointLight(color=white, intensity=1, x=max, y=max, z=max) {

  return data.plot.core.scene.add(newPointLight(color, intensity, x, y, z))

}