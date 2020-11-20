import {width, height} from "../../../libs/mjs/env/window.mjs"

import {addPanels} from "../../../libs/mjs/panels/all.mjs"

import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"
import {drawAxes} from "../../../libs/mjs/draw/axes.mjs"

import {drawCircles} from "../../../libs/mjs/draw/circles.mjs"

let plot = data.plot
let plotType = data.plot.type

$(document).ready(function() {

  $("body").append("<svg id='canvas'></svg>")

  $("#canvas").mousemove(function(event) {

    $(".crosshair").remove()

    if (localRead("settings").crosshairs && !plot.animation.hover) {

      let canvas = d3.select("#canvas")

      $("#canvas").css("cursor", "crosshair")

      canvas.append("line")
            .attr("class", "crosshair")
            .attr("x1", 0)
            .attr("y1", event.pageY)
            .attr("x2", width())
            .attr("y2", event.pageY)

      canvas.append("line")
            .attr("class", "crosshair")
            .attr("x1", event.pageX)
            .attr("y1", 0)
            .attr("x2", event.pageX)
            .attr("y2", height())

      d3.selectAll(".crosshair").setAsBackLayer()
      d3.selectAll(".axis").setAsBackLayer()

    } else {

      $("#canvas").css("cursor", "default")

    }

  })

  addPanels(plotType)

  scaleAxes(plotType)
  drawAxes(plotType)

  drawCircles(plotType)

})
