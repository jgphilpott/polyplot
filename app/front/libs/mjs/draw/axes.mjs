import {drawLine} from "./lines.mjs"
import {red, green, blue} from "../colors/three/rainbow.mjs"
import {min, max, width, height} from "../env/window.mjs"

let plot = data.plot
let plots = plot.plots

export function drawAxes(plotType=plot.type) {

  if (plotType == "Poly2") {

    $(".axis").remove()

    let canvas = d3.select("#canvas")

    canvas.append("g")
          .attr("id", "xAxis")
          .attr("class", "axis")
          .attr("transform", "translate(0, " + height() + ")")
          .call(d3.axisBottom(plot.x.scale)
                  .tickSize(-height())
                  .ticks(7))

    canvas.append("g")
          .attr("id", "yAxis")
          .attr("class", "axis")
          .attr("transform", "translate(0, 0)")
          .call(d3.axisLeft(plot.y.scale)
                  .tickSize(-width())
                  .ticks(7))

    d3.selectAll(".axis").setAsBackLayer()

  } else if (plotType == "Poly3") {

    plot.core.scene.remove(plot.x.axis)
    plot.core.scene.remove(plot.y.axis)
    plot.core.scene.remove(plot.z.axis)

    plot.x.axis = drawLine([[max, min, min], [-max, min, min]], red)
    plot.y.axis = drawLine([[min, max, min], [min, -max, min]], green)
    plot.z.axis = drawLine([[min, min, max], [min, min, -max]], blue)

  }

}
