let plot = data.plot

export function drawRivers(canvas, rivers=plot.GeoJSON.properties.layers.rivers) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.layers.checkpoint

  $(".river").remove()

  canvas.selectAll(".river")
        .data(rivers.filter(function(river) {

          return river.rank <= checkpoint

        }))
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(geoProperties.projection))
        .attr("class", "river")
        .attr("transform", geoProperties.zoom)
        .style("fill", "none")
        .style("stroke", "lightblue")
        .style("stroke-width", function(river) {

          return [0.1, 0.09, 0.08, 0.07, 0.06, 0.05, 0.04, 0.03, 0.02, 0.01][river.rank - 1]

        })

}
