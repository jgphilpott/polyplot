import {xEvents} from "../core/events.mjs"
import {addTimeEvents} from "./time.mjs"

export function addEventListeners() {

  data.plot.core.dom = xEvents()

  addTimeEvents()

}
