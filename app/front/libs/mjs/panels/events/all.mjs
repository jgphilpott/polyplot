import {makeClosable} from "./close.mjs"
import {makeDragable} from "./drag.mjs"
import {addPanelHover} from "./hover.mjs"

export function addPanelEvents(panel) {

  makeClosable(panel)
  makeDragable(panel)
  addPanelHover(panel)

}
