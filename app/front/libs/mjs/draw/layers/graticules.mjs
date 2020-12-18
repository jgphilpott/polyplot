let plot = data.plot

export function drawGraticules(canvas, graticules=plot.GeoJSON.properties.layers.graticules) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.layers.checkpoint

  $(".graticule").remove()

  canvas.selectAll(".graticule")
        .data(function() {

          if (checkpoint == 1 || checkpoint == 2) {
            return graticules[2].grid
          } else if (checkpoint == 3 || checkpoint == 4) {
            return graticules[1].grid
          } else if (checkpoint == 5 || checkpoint == 6) {
            return graticules[0].grid
          }

        })
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(geoProperties.projection))
        .attr("class", "graticule")
        .attr("transform", geoProperties.zoom)
        .style("fill", "none")
        .style("stroke", "gray")
        .style("stroke-width", function() {

          return [1, 0.5, 0.25, 0.125, 0.0625, 0.03125][checkpoint - 1]

        })
        .style("stroke-dasharray", ("5, 5, 5, 5, 5, 5, 10, 5, 10, 5, 10, 5"))

}
