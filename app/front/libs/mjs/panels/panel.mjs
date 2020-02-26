import {xEvents} from "../core/events.mjs"

import {addErrorPanel} from "./error.mjs"
import {addHomePanel} from "./home.mjs"
import {addLegendPanel} from "./legend.mjs"
import {addMapPanel} from "./map.mjs"
import {addMetaPanel} from "./meta.mjs"
import {addSettingsPanel} from "./settings.mjs"
import {addTimePanel} from "./time.mjs"

export function addPanels() {

  data.plot.core.dom = xEvents()

  addErrorPanel()
  addHomePanel()
  addLegendPanel()
  addMapPanel()
  addMetaPanel()
  addSettingsPanel()
  addTimePanel()

}
