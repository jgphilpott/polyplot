import {makeDragable} from "../ui/dragable.mjs"

import {addErrorPanel} from "./error.mjs"
import {addHomePanel} from "./home.mjs"
import {addLegendPanel} from "./legend.mjs"
import {addLinePanel} from "./line.mjs"
import {addMapPanel} from "./map.mjs"
import {addMenuPanel} from "./menu.mjs"
import {addMetaPanel} from "./meta.mjs"
import {addTimePanel} from "./time.mjs"
import {addTitlePanel} from "./title.mjs"

export function makePanelsDragable() {

  let panels = $(".panel")

  for (let i = 0; i < panels.length; i++) {

    let panel = $("#" + panels[i].id + ".panel")
    makeDragable(panel)

  }

}

export function addAllPanels() {

  // addLegendPanel()
  addMenuPanel()
  // addMetaPanel()
  addTimePanel()
  addTitlePanel()

  if (data.plot.type == "Map") {

    addLinePanel()

  } else if (data.plot.type == "Poly2") {

    addMapPanel()

  } else if (data.plot.type == "Poly3") {

    addMapPanel()

  }

  makePanelsDragable()

}
