import {addCountriesPanel} from "./countries.mjs"
import {addIndicatorsPanel} from "./indicators.mjs"
import {addLayersPanel} from "./layers.mjs"
import {addLegendPanel} from "./legend.mjs"
import {addLinePanel} from "./line.mjs"
import {addMapPanel} from "./map.mjs"
import {addMetaPanel} from "./meta.mjs"
import {addTimePanel} from "./time.mjs"
import {addTitlePanel} from "./title.mjs"

export function addPanels() {

  let panelSettings = localRead("settings").panels

  addIndicatorsPanel(panelSettings.indicators)
  addLegendPanel(panelSettings.legend)
  addMetaPanel(panelSettings.meta)
  addTimePanel(panelSettings.time)
  addTitlePanel(panelSettings.title)

  if (data.plot.type == "Map") {

    addLayersPanel(panelSettings.layers)
    addLinePanel(panelSettings.line)

  } else if (data.plot.type == "Poly2") {

    addCountriesPanel(panelSettings.countries)
    addMapPanel(panelSettings.map)

  } else if (data.plot.type == "Poly3") {

    addCountriesPanel(panelSettings.countries)
    addMapPanel(panelSettings.map)

  }

  $("#canvas").mousemove(function() {

    $("#contextMenu").remove()

  })

}
