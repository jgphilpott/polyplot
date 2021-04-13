import {contextMenu} from "../env/context.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"
import {updateMetaPanel, clearMetaPanel} from "../panels/meta.mjs"

let plot = data.plot
let plots = plot.plots

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
          .style("fill", regionsColourSwitch(circle.region))

    $("#" + circle.code + ".circle").mouseenter(function() {

      plot.animation.hover = true
      updateMetaPanel(circle.code)

    }).mouseleave(function() {

      plot.animation.hover = false
      clearMetaPanel()

    })

    $("#" + circle.code + ".circle").contextmenu(function(event) {
      contextMenu(circle.code, event)
    })

  }

}

export function drawCircles(plotType=plot.type) {

  plots.sort(function(a, b) {

    let ar = a.r.find(date => date.year == plot.t.year).value
    let br = b.r.find(date => date.year == plot.t.year).value

    return br - ar

  })

  for (let i = 0; i < plots.length; i++) {

    let r = plots[i].r.find(date => date.year == plot.t.year).value
    let x = plots[i].x.find(date => date.year == plot.t.year).value
    let y = plots[i].y.find(date => date.year == plot.t.year).value

    plots[i].object = drawCircle(plots[i], r, x, y)

  }

}
