import {drawCircle} from "../../draw/circles.mjs"

let plot = data.plot
let plots = plot.plots

export function animateCircles(duration) {

  for (let i = 0; i < plots.length; i++) {

    let circle = $("#" + plots[i].code).length

    let rNew = plots[i].r.find(item => item.year == data.plot.t.year).value
    let xNew = plots[i].x.find(item => item.year == data.plot.t.year).value
    let yNew = plots[i].y.find(item => item.year == data.plot.t.year).value

    if (circle && (typeof(rNew) == "number" && typeof(xNew) == "number" && typeof(yNew) == "number")) {

      d3.select("#" + plots[i].code)
        .transition()
        .ease(d3.easeLinear)
        .duration(duration)
        .attr("r", plot.r.scale(rNew))
        .attr("cx", plot.x.scale(xNew))
        .attr("cy", plot.y.scale(yNew))

    } else if (circle && !(typeof(rNew) == "number" && typeof(xNew) == "number" && typeof(yNew) == "number")) {

      $("#" + plots[i].code).remove()

    } else if (!circle && (typeof(rNew) == "number" && typeof(xNew) == "number" && typeof(yNew) == "number")) {

      drawCircle(plots[i], rNew, xNew, yNew)

    }

  }

}
