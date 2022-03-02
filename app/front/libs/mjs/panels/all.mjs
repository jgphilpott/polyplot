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

  addCountriesPanel(panelSettings.countries)
  addIndicatorsPanel(panelSettings.indicators)
  addLegendPanel(panelSettings.legend)
  addMetaPanel(panelSettings.meta)
  addTimePanel(panelSettings.time)
  addTitlePanel(panelSettings.title)

  if (data.plot.type == "Map") {

    addLayersPanel(panelSettings.layers)
    addLinePanel(panelSettings.line)

  } else if (data.plot.type == "Poly2") {

    addMapPanel(panelSettings.map)

  } else if (data.plot.type == "Poly3") {

    addMapPanel(panelSettings.map)

  }

  $("#canvas, .panel").mouseover(function() {

    $("#context-menu").remove()

  })

}