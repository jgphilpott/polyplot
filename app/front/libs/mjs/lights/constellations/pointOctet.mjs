import {addPointLight} from "../point.mjs"
import {white} from "../../colors/three/grayscale.mjs"
import {min, max} from "../../env/dimensions.mjs"

export function addPointOctet(scene=data.plot.core.scene, color=white, intensity=1, x=max, y=max, z=max) {

  addPointLight(scene, color, intensity, x, y, z)
  addPointLight(scene, color, intensity, -x, y, z)
  addPointLight(scene, color, intensity, x, -y, z)
  addPointLight(scene, color, intensity, -x, -y, z)
  addPointLight(scene, color, intensity, x, y, -z)
  addPointLight(scene, color, intensity, -x, y, -z)
  addPointLight(scene, color, intensity, x, -y, -z)
  addPointLight(scene, color, intensity, -x, -y, -z)

}
