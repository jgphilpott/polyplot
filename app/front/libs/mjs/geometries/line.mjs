import {black} from "../colors/three/grayscale.mjs"
import {newVector} from "./vector.mjs"
import {newLineMaterial} from "../materials/line.mjs"

export function newLine(vertices=[], color=black, linewidth=1) {

  return new THREE.Line(newVector(vertices), newLineMaterial(color, linewidth))

}

export function addLine(vertices=[], color=black, linewidth=1) {

  let line = newLine(vertices, color, linewidth)
  data.plot.core.scene.add(line)
  return line

}
