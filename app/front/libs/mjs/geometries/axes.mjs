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

export function addAxis(scene, type) {

  let axis = newAxis(type)
  scene.add(axis)
  return axis

}

export function addAxes(scene) {

  addAxis(scene, "x")
  addAxis(scene, "y")
  addAxis(scene, "z")

}
