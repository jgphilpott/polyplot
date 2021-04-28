let plot = data.plot
let plots = plot.plots

export function animateMaps(duration) {

  d3.selectAll(".map")
    .transition()
    .duration(duration)
    .style("fill", function(map) {

      if (data.client.settings.general.countryExceptions.includes(map.properties.code) != true) {

        let history = plots.find(plot => plot.code == map.properties.code).x
        let value = history.find(date => date.year == plot.t.year).value

        if (typeof(value) == "number") { return plot.x.scale(value) } else { return "gray" }

      } else { return "gray" }

    })

}
