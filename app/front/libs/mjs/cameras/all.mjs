import {addPerspectiveCamera} from "./perspective.mjs"

let plot = data.plot

export function addCamera() {

  let camera = addPerspectiveCamera()

  return camera

}
