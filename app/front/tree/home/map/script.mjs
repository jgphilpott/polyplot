import {addPanels} from "../../../libs/mjs/panels/all.mjs"

import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"

import {drawMaps} from "../../../libs/mjs/draw/maps.mjs"

let plotType = data.plot.type

$(document).ready(function() {

  $("body").append("<svg id='canvas'></svg>")

  addPanels(plotType)

  scaleAxes(plotType)

  drawMaps(plotType)

})
