import {addPanels} from "../../../libs/mjs/panels/all.mjs"

import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"
import {drawAxes} from "../../../libs/mjs/draw/axes.mjs"

import {drawCircles} from "../../../libs/mjs/draw/circles.mjs"

let plotType = data.plot.type

$(document).ready(function() {

  $("body").append("<svg id='canvas'></svg>")

  addPanels(plotType)

  scaleAxes(plotType)
  drawAxes(plotType)

  drawCircles(plotType)

})
