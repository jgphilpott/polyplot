let plot = data.plot

export function drawRoads(canvas, roads=plot.GeoJSON.properties.layers.roads) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.layers.checkpoint

  $(".road").remove()

  canvas.selectAll(".road")
        .data(roads.filter(function(road) {

          if (checkpoint <= 3) {
            return road.rank <= 3
          } else {
            return road
          }

        }))
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(geoProperties.projection))
        .attr("class", "road")
        .attr("transform", geoProperties.zoom)
        .style("fill", "none")
        .style("stroke", "gray")
        .style("stroke-width", function(road) {

          return [0.5, 0.25, 0.125, 0.0625, 0.03125, 0.015625][checkpoint - 1]

        })

}
