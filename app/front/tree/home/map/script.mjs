import {addAllPanels} from "../../../libs/mjs/panels/all.mjs"
import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"
import {drawMaps} from "../../../libs/mjs/draw/maps.mjs"
import {makeZoomable} from "../../../libs/mjs/cartography/zoom.mjs"

let plot = data.plot
let plotType = plot.type

$(document).ready(function() {

  $("body").append("<svg id='canvas'></svg>")

  let canvas = d3.select("#canvas")

  addAllPanels(plotType)

  scaleAxes(plotType)

  drawMaps(plotType)

  makeZoomable(canvas)

})
