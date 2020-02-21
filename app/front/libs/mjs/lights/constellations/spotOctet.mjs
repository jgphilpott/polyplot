import {addSpotLight} from "../spot.mjs"
import {white} from "../../colors/three/grayscale.mjs"
import {min, max} from "../../env/dimensions.mjs"

export function addSpotOctet(scene=data.plot.core.scene, color=white, intensity=1, x=max, y=max, z=max, xTarget=min, yTarget=min, zTarget=min) {

  addSpotLight(scene, color, intensity, x, y, z, xTarget, yTarget, zTarget)
  addSpotLight(scene, color, intensity, -x, y, z, xTarget, yTarget, zTarget)
  addSpotLight(scene, color, intensity, x, -y, z, xTarget, yTarget, zTarget)
  addSpotLight(scene, color, intensity, -x, -y, z, xTarget, yTarget, zTarget)
  addSpotLight(scene, color, intensity, x, y, -z, xTarget, yTarget, zTarget)
  addSpotLight(scene, color, intensity, -x, y, -z, xTarget, yTarget, zTarget)
  addSpotLight(scene, color, intensity, x, -y, -z, xTarget, yTarget, zTarget)
  addSpotLight(scene, color, intensity, -x, -y, -z, xTarget, yTarget, zTarget)

}
