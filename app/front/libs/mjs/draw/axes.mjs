import {addLine} from "./lines.mjs"
import {min, max, width, height} from "../env/window.mjs"

let plot = data.plot
let plots = plot.plots

export function drawAxes(plotType=plot.type) {

  if (plotType == "Poly2") {

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

  } else if (plotType == "Poly3") {

    addLine([[max, min, min], [-max, min, min]])
    addLine([[min, max, min], [min, -max, min]])
    addLine([[min, min, max], [min, min, -max]])

  }

}
