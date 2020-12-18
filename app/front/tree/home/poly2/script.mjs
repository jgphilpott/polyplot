import {addPanels} from "../../../libs/mjs/panels/all.mjs"
import {drawCircles} from "../../../libs/mjs/draw/circles.mjs"
import {addCrosshairTool} from "../../../libs/mjs/tools/crosshair.mjs"

let plot = data.plot
let plotType = data.plot.type

$(document).ready(function() {

  $("body").append("<svg id='canvas'></svg>")

  addPanels(plotType)
  drawCircles(plotType)
  addCrosshairTool()

})
