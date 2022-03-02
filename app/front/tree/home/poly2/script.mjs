import {addPanels} from "../../../libs/mjs/panels/all.mjs"
import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"
import {drawCircles} from "../../../libs/mjs/draw/circles.mjs"
import {addCrosshairTool} from "../../../libs/mjs/tools/crosshair.mjs"

let plotType = data.plot.type

$(document).ready(function() {

  $("body").append("<svg id='canvas'></svg>")

  addPanels(plotType)
  scaleAxes(plotType)
  drawCircles(plotType)
  addCrosshairTool()

})