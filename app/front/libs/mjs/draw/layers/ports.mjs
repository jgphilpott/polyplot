let plot = data.plot

export function drawPorts(canvas, ports=plot.GeoJSON.properties.layers.ports) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.layers.checkpoint
  let size = geoProperties.layers.sizeSwitch()

  $(".port").remove()

  canvas.selectAll(".port")
        .data(ports.filter(function(port) {

          if (checkpoint == 1) {
            return port.flow > 10000000
          } else if (checkpoint == 2) {
            return port.flow > 1000000
          } else if (checkpoint == 3) {
            return port.flow > 100000
          } else if (checkpoint == 4) {
            return port.flow > 10000
          } else if (checkpoint == 5) {
            return port.flow > 1000
          } else if (checkpoint == 6) {
            return port.flow
          }

        }))
        .enter()
        .append("svg:image")
        .attr("xlink:href", "/front/imgs/layers/port.png")
        .attr("class", "port")
        .attr("x", function(port) {

          return geoProperties.projection([port.longitude, port.latitude])[0] - (size / 2)

        })
        .attr("y", function(port) {

          return geoProperties.projection([port.longitude, port.latitude])[1] - size

        })
        .attr("width", size)
        .attr("height", size)

}
