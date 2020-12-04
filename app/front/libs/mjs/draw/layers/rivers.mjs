let plot = data.plot

export function drawRivers(canvas, rivers=plot.GeoJSON.properties.layers.rivers) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.layers.checkpoint

  $(".river").remove()

  canvas.selectAll(".river")
        .data(rivers.filter(function(river) {

          if (checkpoint == 1) {
            return river.rank <= 2
          } else if (checkpoint == 2) {
            return river.rank <= 4
          } else if (checkpoint == 3) {
            return river.rank <= 6
          } else if (checkpoint == 4) {
            return river.rank <= 8
          } else if (checkpoint == 5) {
            return river.rank <= 10
          } else if (checkpoint == 6) {
            return river.rank
          }

        }))
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(geoProperties.projection))
        .attr("class", "river")
        .style("fill", "none")
        .style("stroke", "blue")
        .style("stroke-width", function(river) {

          let riverWidths = [0.1, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01]

          return riverWidths[river.rank - 1]

        })

}
