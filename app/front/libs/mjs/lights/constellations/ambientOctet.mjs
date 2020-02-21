import {addAmbientLight} from "../ambient.mjs"
import {white} from "../../colors/three/grayscale.mjs"
import {min, max} from "../../env/dimensions.mjs"

export function addAmbientOctet(color=white, intensity=1, x=max, y=max, z=max) {

  addAmbientLight(color, intensity, x, y, z)
  addAmbientLight(color, intensity, -x, y, z)
  addAmbientLight(color, intensity, x, -y, z)
  addAmbientLight(color, intensity, -x, -y, z)
  addAmbientLight(color, intensity, x, y, -z)
  addAmbientLight(color, intensity, -x, y, -z)
  addAmbientLight(color, intensity, x, -y, -z)
  addAmbientLight(color, intensity, -x, -y, -z)

}
