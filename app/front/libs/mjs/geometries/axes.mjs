import {newLine} from "./line.mjs"
import {min, max} from "../env/dimensions.mjs"

export function newAxis(type) {

  if (type == "x") {

    return newLine([[max, min, min], [-max, min, min]])

  } else if (type == "y") {

    return newLine([[min, max, min], [min, -max, min]])

  } else if (type == "z") {

    return newLine([[min, min, max], [min, min, -max]])

  }

}

export function addAxes(scene) {

  scene.add(newAxis("x"))
  scene.add(newAxis("y"))
  scene.add(newAxis("z"))

}
