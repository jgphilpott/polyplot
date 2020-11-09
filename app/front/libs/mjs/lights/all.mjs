import {addAmbientLight} from "./ambient.mjs"
import {addPointLight} from "./point.mjs"
import {addSpotLight} from "./spot.mjs"

export function addLights() {

  let lights = {"ambient": addAmbientLight(), "point": addPointLight()}

  return lights

}
