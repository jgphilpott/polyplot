import {newVector} from "./vector.mjs"
import {newLineMaterial} from "../materials/line.mjs"

export function newLine(vertices=[]) {

  return new THREE.Line(newVector(vertices), newLineMaterial())

}
