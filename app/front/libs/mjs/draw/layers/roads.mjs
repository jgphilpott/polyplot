let plot = data.plot

export function drawRoads(canvas, roads=plot.GeoJSON.properties.layers.roads) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.checkpoint

  $(".road").remove()

  canvas.selectAll(".road")
        .data(roads.filter(function(road) { return road.properties.rank - 1 <= checkpoint }))
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(geoProperties.projection))
        .attr("class", "road")
        .attr("transform", geoProperties.zoom)
        .style("fill", "none")
        .style("stroke", "gray")
        .style("stroke-width", function(road) {

          let roadSize = {"Major Highway": 1.5, "Secondary Highway": 1.25, "Road": 1}

          return [0.1, 0.09, 0.08, 0.07, 0.06, 0.05][checkpoint - 1] * roadSize[road.properties.category]

        })

}
