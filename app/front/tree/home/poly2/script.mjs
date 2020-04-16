import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"
import {addAllPanels} from "../../../libs/mjs/panels/all.mjs"
import {width, height} from "../../../libs/mjs/env/dimensions.mjs"

$(document).ready(function() {

  let plot = data.plot

  $("body").append("<svg id='canvas'></svg>")

  let canvas = d3.select("#canvas")

  scaleAxes()

  canvas.append("g")
        .attr("class", "gridline")
        .attr("transform", "translate(0, " + height() + ")")
        .call(d3.axisBottom(plot.x.scale)
                .tickSize(-height())
                .ticks(7))

  canvas.append("g")
        .attr("class", "gridline")
        .attr("transform", "translate(0, 0)")
        .call(d3.axisLeft(plot.y.scale)
                .tickSize(-width())
                .ticks(7))

  addAllPanels()

  console.log(data)

})
