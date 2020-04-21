let plot = data.plot

export function animateMaps(duration) {

  d3.selectAll(".map")
    .transition()
    .duration(duration)
    .style("fill", function(feature) {

      let history = plot.plots.find(plot => plot.code == feature.properties.code).x
      let value = history.find(year => year.year == plot.t.year).value

      if (typeof(value) == "number") {

        return plot.x.scale(value)

      } else {

        return "gray"

      }

    })

}
