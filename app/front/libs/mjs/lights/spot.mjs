import {white} from "../colors/three/grayscale.mjs"
import {min, max} from "../env/dimensions.mjs"

export function newSpotLight(color=white, intensity=1, x=max, y=max, z=max, xTarget=min, yTarget=min, zTarget=min) {

  let light = new THREE.SpotLight(color, intensity)
  light.position.set(x, y, z)
  light.target.position.set(xTarget, yTarget, zTarget)
  return light

}

export function addSpotLight(color=white, intensity=1, x=max, y=max, z=max, xTarget=min, yTarget=min, zTarget=min) {

  data.plot.core.scene.add(newSpotLight(color, intensity, x, y, z, xTarget, yTarget, zTarget))

}
