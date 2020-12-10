import {addCountriesPanel} from "./countries.mjs"
import {addIndicatorsPanel} from "./indicators.mjs"
import {addLegendPanel} from "./legend.mjs"
import {addLinePanel} from "./line.mjs"
import {addMapPanel} from "./map.mjs"
import {addMetaPanel} from "./meta.mjs"
import {addTimePanel} from "./time.mjs"
import {addTitlePanel} from "./title.mjs"

export function addPanels() {

  addCountriesPanel()
  addIndicatorsPanel()
  addLegendPanel()
  addMetaPanel()
  addTimePanel()
  addTitlePanel()

  if (data.plot.type == "Map") {

    addLinePanel()

  } else if (data.plot.type == "Poly2") {

    addMapPanel()

  } else if (data.plot.type == "Poly3") {

    addMapPanel()

  }

  $("#canvas").mousemove(function() {

    $("#contextMenu").remove()

  })

}
