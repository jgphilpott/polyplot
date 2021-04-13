import {drawCircle} from "../../draw/circles.mjs"

let plot = data.plot
let plots = plot.plots

export function animateCircles(duration) {

  for (let i = 0; i < plots.length; i++) {

    let circle = $("#" + plots[i].code + ".circle").length

    let r = plots[i].r.find(item => item.year == data.plot.t.year).value
    let x = plots[i].x.find(item => item.year == data.plot.t.year).value
    let y = plots[i].y.find(item => item.year == data.plot.t.year).value

    if (circle && (typeof(r) == "number" && typeof(x) == "number" && typeof(y) == "number")) {

      d3.select("#" + plots[i].code + ".circle")
        .transition()
        .ease(d3.easeLinear)
        .duration(duration)
        .attr("r", plot.r.scale(r))
        .attr("cx", plot.x.scale(x))
        .attr("cy", plot.y.scale(y))

    } else if (circle && !(typeof(r) == "number" && typeof(x) == "number" && typeof(y) == "number")) {

      $("#" + plots[i].code + ".circle").remove()

    } else if (!circle && (typeof(r) == "number" && typeof(x) == "number" && typeof(y) == "number")) {

      drawCircle(plots[i], r, x, y)

    }

  }

}
