import {black} from "../colors/three/grayscale.mjs"
import {newVector} from "./vector.mjs"
import {newLineMaterial} from "../materials/line.mjs"

export function newLine(vertices=[], color=black, linewidth=1) {

  return new THREE.Line(newVector(vertices), newLineMaterial(color, linewidth))

}
