let plot = data.plot

export function drawLakes(canvas, lakes=plot.GeoJSON.properties.layers.lakes) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.layers.checkpoint

  $(".lake").remove()

  canvas.selectAll(".lake")
        .data(lakes.filter(function(lake) {

          if (checkpoint == 1) {
            return lake.rank <= 2
          } else if (checkpoint == 2) {
            return lake.rank <= 4
          } else if (checkpoint == 3) {
            return lake.rank <= 6
          } else if (checkpoint == 4) {
            return lake.rank <= 8
          } else if (checkpoint == 5) {
            return lake.rank <= 10
          } else if (checkpoint == 6) {
            return lake.rank
          }

        }))
        .enter()
        .append("path")
        .attr("d", d3.geoPath().projection(geoProperties.projection))
        .attr("class", "lake")
        .style("fill", "lightblue")

}
