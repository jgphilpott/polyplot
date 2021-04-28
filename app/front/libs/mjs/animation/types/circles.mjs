import {drawCircle} from "../../draw/circles.mjs"

let plot = data.plot
let plots = plot.plots

export function animateCircles(duration) {

  plots.sort(function(a, b) {

    let ar = a.r.find(date => date.year == plot.t.year).value
    let br = b.r.find(date => date.year == plot.t.year).value

    return br - ar

  })

  for (let i = 0; i < plots.length; i++) {

    if (data.client.settings.general.countryExceptions.includes(plots[i].code) != true) {

      let circle = $("#" + plots[i].code + ".circle").length

      let r = plots[i].r.find(date => date.year == plot.t.year).value
      let x = plots[i].x.find(date => date.year == plot.t.year).value
      let y = plots[i].y.find(date => date.year == plot.t.year).value

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
        plots[i].object = false

      } else if (!circle && (typeof(r) == "number" && typeof(x) == "number" && typeof(y) == "number")) {

        plots[i].object = drawCircle(plots[i], r, x, y)

      }

      d3.selectAll("#" + plots[i].code + ".circle").setAsFrontLayer()

    } else {

      $("#" + plots[i].code + ".circle").remove()
      plots[i].object = false

    }

  }

}
