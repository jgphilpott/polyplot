import {white} from "../../colors/three/grayscale.mjs"
import {min, max} from "../../env/dimensions.mjs"
import {addSpotLight} from "../spot.mjs"

export function addSpotOctet(color=white, intensity=1, x=max, y=max, z=max, xTarget=min, yTarget=min, zTarget=min) {

  addSpotLight(color, intensity, x, y, z, xTarget, yTarget, zTarget)
  addSpotLight(color, intensity, -x, y, z, xTarget, yTarget, zTarget)
  addSpotLight(color, intensity, x, -y, z, xTarget, yTarget, zTarget)
  addSpotLight(color, intensity, -x, -y, z, xTarget, yTarget, zTarget)
  addSpotLight(color, intensity, x, y, -z, xTarget, yTarget, zTarget)
  addSpotLight(color, intensity, -x, y, -z, xTarget, yTarget, zTarget)
  addSpotLight(color, intensity, x, -y, -z, xTarget, yTarget, zTarget)
  addSpotLight(color, intensity, -x, -y, -z, xTarget, yTarget, zTarget)

}
