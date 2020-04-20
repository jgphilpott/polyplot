export function animateMaps() {

  let plot = data.plot

  d3.selectAll(".map")
    .transition()
    .duration(plot.animation.speed)
    .style("fill", function(feature) {

      let history = plot.plots.find(plot => plot.code == feature.properties.code).x
      let value = history.find(year => year.year == plot.t.year).value

      if (typeof(value) == "number") {

        return plot.x.scale(value)

      } else {

        return "gray"

      }

    })

    console.log(plot.t.year)

}
