import {regionsColourSwitch} from "../colors/switches/regions.mjs"
import {updateMetaPanel, clearMetaPanel} from "../panels/meta.mjs"

let plot = data.plot
let plots = plot.plots.sort(function(a, b) {

  a = a.r.find(date => date.year == plot.t.year).value
  b = b.r.find(date => date.year == plot.t.year).value

  if (a > b) {

    return -1

  } else if (a < b) {

    return 1

  } else {

    return 0

  }

})

export function drawCircle(circle, plotType=plot.type) {

  let canvas = d3.select("#canvas")

  let r = circle.r.find(date => date.year == plot.t.year).value
  let x = circle.x.find(date => date.year == plot.t.year).value
  let y = circle.y.find(date => date.year == plot.t.year).value

  if (typeof(r) == "number" && typeof(x) == "number" && typeof(y) == "number") {

    canvas.append("circle")
          .data([circle])
          .attr("id", circle.code)
          .attr("class", "circle")
          .attr("r", plot.r.scale(r))
          .attr("cx", plot.x.scale(x))
          .attr("cy", plot.y.scale(y))
          .attr("fill", regionsColourSwitch(circle.region))

  }

  $("#" + circle.code + ".circle").mouseenter(function() {

    updateMetaPanel(circle.code)

  }).mouseleave(function() {

    clearMetaPanel()

  })

}

export function drawCircles(plotType=plot.type) {

  for (let i = 0; i < plots.length; i++) {

    drawCircle(plots[i])

  }

}
