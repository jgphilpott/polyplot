import {regionsColourSwitch} from "../colors/switches/regions.mjs"
import {updateMetaPanel, clearMetaPanel} from "../panels/meta.mjs"

let plot = data.plot
let plots = plot.plots.sort(function(a, b) {

  if (a.r && b.r) {

    a = a.r.find(date => date.year == plot.t.year).value
    b = b.r.find(date => date.year == plot.t.year).value

  }

  if (a > b) {

    return -1

  } else if (a < b) {

    return 1

  } else {

    return 0

  }

})

export function drawCircle(circle, r, x, y, plotType=plot.type) {

  let canvas = d3.select("#canvas")

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

    $(".crosshair").remove()
    plot.animation.showCrosshair = false

    updateMetaPanel(circle.code)

  }).mouseleave(function() {

    plot.animation.showCrosshair = true

    clearMetaPanel()

  })

}

export function drawCircles(plotType=plot.type) {

  for (let i = 0; i < plots.length; i++) {

    let r = plots[i].r.find(date => date.year == plot.t.year).value
    let x = plots[i].x.find(date => date.year == plot.t.year).value
    let y = plots[i].y.find(date => date.year == plot.t.year).value

    drawCircle(plots[i], r, x, y)

  }

}
