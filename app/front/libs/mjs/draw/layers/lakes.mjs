let plot = data.plot

export function drawLakes(canvas, lakes=plot.GeoJSON.properties.layers.lakes) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.layers.checkpoint

  $(".lake").remove()

  canvas.selectAll(".lake")
        .data(lakes.filter(function(lake) {

          return lake.rank <= checkpoint

        }))
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(geoProperties.projection))
        .attr("class", "lake")
        .attr("transform", geoProperties.zoom)
        .style("fill", "lightblue")

}
