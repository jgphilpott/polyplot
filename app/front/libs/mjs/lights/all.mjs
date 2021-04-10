import {addAmbientLight} from "./ambient.mjs"
import {addPointLight} from "./point.mjs"
import {addSpotLight} from "./spot.mjs"

export function addLights() {

  return {"ambient": addAmbientLight(), "point": addPointLight()}

}
