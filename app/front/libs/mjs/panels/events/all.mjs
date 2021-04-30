import {makeClosable} from "./close.mjs"
import {makeDragable} from "./drag.mjs"
import {addPanelHover} from "./hover.mjs"
import {makeScrollable} from "./scroll.mjs"

export function addPanelEvents(panel, fixed=false) {

  if (!fixed) {

    makeClosable(panel)
    makeDragable(panel)
    addPanelHover(panel)

  } else {

    makeScrollable(panel)

  }

  setBackground(panel, data.client.settings.general.opacity)

}
