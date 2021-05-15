let plot = data.plot

export function drawAirports(canvas, airports=plot.GeoJSON.properties.layers.airports) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.checkpoint
  let size = [12, 6, 3, 1.5, 0.75, 0.375][checkpoint - 1]

  $(".airport").remove()

  canvas.selectAll(".airport")
        .data(airports.filter(function(airport) {

          return airport.properties.flow >= [10000000, 2500000, 625000, 156250, 39062.5, 9765.625][checkpoint - 1]

        }))
        .enter()
        .append("svg:image")
        .attr("xlink:href", "/front/imgs/layers/airport.png")
        .attr("id", function(airport) { return airport.properties.code })
        .attr("class", "airport")
        .attr("transform", geoProperties.zoom)
        .attr("x", function(airport) {

          return geoProperties.projection([airport.geometry.coordinates[0] , airport.geometry.coordinates[1]])[0] - (size / 2)

        })
        .attr("y", function(airport) {

          return geoProperties.projection([airport.geometry.coordinates[0], airport.geometry.coordinates[1]])[1] - size

        })
        .style("width", size)
        .style("height", size)

}
