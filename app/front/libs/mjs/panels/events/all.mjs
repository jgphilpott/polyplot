import {makeDragable} from "./drag.mjs"
import {addPanelHover} from "./hover.mjs"

export function addPanelEvents(panel) {

  makeDragable(panel)
  addPanelHover(panel)

}
