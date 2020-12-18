let plot = data.plot

export function drawRailroads(canvas, railroads=plot.GeoJSON.properties.layers.railroads) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.layers.checkpoint

  $(".railroad").remove()

  canvas.selectAll(".railroad")
        .data(railroads.filter(function(railroad) {

          if (checkpoint == 1 || checkpoint == 2) {
            return railroad.rank <= 5
          } else if (checkpoint == 3 || checkpoint == 4) {
            return railroad.rank <= 6
          } else if (checkpoint == 5 || checkpoint == 6) {
            return railroad.rank <= 7
          }

        }))
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(geoProperties.projection))
        .attr("class", "railroad")
        .attr("transform", geoProperties.zoom)
        .style("fill", "none")
        .style("stroke", "red")
        .style("stroke-width", function(railroad) {

          return [0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625][checkpoint - 1]

        })

}
