let plot = data.plot

export function drawRailroads(canvas, railroads=plot.GeoJSON.properties.layers.railroads) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.layers.checkpoint

  $(".railroad").remove()

  canvas.selectAll(".railroad")
        .data(railroads.filter(function(railroad) { return railroad.properties.rank - 2 <= checkpoint }))
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(geoProperties.projection))
        .attr("class", "railroad")
        .attr("transform", geoProperties.zoom)
        .style("fill", "none")
        .style("stroke", "red")
        .style("stroke-width", function(railroad) { return [0.1, 0.09, 0.08, 0.07, 0.06, 0.05][checkpoint - 1] })

}
