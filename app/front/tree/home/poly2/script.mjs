import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"
import {addAllPanels} from "../../../libs/mjs/panels/all.mjs"
import {width, height} from "../../../libs/mjs/env/dimensions.mjs"
import {regionsColourSwitch} from "../../../libs/mjs/colors/switches/regions.mjs"

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

  let plots = plot.plots.sort(function(a, b) {

    a = a.r.find(item => item.year == plot.time.year).value
    b = b.r.find(item => item.year == plot.time.year).value

    if (a <= b) {

      return 1

    } else if (a > b) {

      return -1

    } else {

      return 0

    }

  })

  for (let i = 0; i < plots.length; i++) {

    let r = plots[i].r.find(item => item.year == plot.time.year).value
    let x = plots[i].x.find(item => item.year == plot.time.year).value
    let y = plots[i].y.find(item => item.year == plot.time.year).value

    canvas.append("circle")
          .attr("id", plots[i].code)
          .attr("class", "plot")
          .attr("r", plot.r.scale(r))
          .attr("cx", plot.x.scale(x))
          .attr("cy", plot.y.scale(y))
          .attr("fill", regionsColourSwitch(plots[i].region))

  }

  addAllPanels()

  console.log(data)

})
