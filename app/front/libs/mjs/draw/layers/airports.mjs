let plot = data.plot

export function drawAirports(canvas, airports=plot.GeoJSON.properties.layers.airports) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.layers.checkpoint
  let size = geoProperties.layers.sizeSwitch()

  $(".airport").remove()

  canvas.selectAll(".airport")
        .data(airports.filter(function(airport) {

          if (checkpoint == 1) {
            return airport.flow > 10000000
          } else if (checkpoint == 2) {
            return airport.flow > 1000000
          } else if (checkpoint == 3) {
            return airport.flow > 100000
          } else if (checkpoint == 4) {
            return airport.flow > 10000
          } else if (checkpoint == 5) {
            return airport.flow > 1000
          } else if (checkpoint == 6) {
            return airport.flow
          }

        }))
        .enter()
        .append("svg:image")
        .attr("xlink:href", "/front/imgs/layers/airport.png")
        .attr("class", "airport")
        .attr("transform", geoProperties.zoom)
        .attr("x", function(airport) {

          return geoProperties.projection([airport.longitude, airport.latitude])[0] - (size / 2)

        })
        .attr("y", function(airport) {

          return geoProperties.projection([airport.longitude, airport.latitude])[1] - size

        })
        .attr("width", size)
        .attr("height", size)

}
