let plot = data.plot

export function drawPorts(canvas, ports=plot.GeoJSON.properties.layers.ports) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.layers.checkpoint
  let size = [12, 6, 3, 1.5, 0.75, 0.375][checkpoint - 1]

  $(".port").remove()

  canvas.selectAll(".port")
        .data(ports.filter(function(port) {

          return port.properties.flow >= [20000000, 5000000, 1250000, 312500, 78125, 19531.25][checkpoint - 1]

        }))
        .enter()
        .append("svg:image")
        .attr("xlink:href", "/front/imgs/layers/port.png")
        .attr("id", function(port) { return port.properties.code })
        .attr("class", "port")
        .attr("transform", geoProperties.zoom)
        .attr("x", function(port) {

          return geoProperties.projection([port.geometry.coordinates[0], port.geometry.coordinates[1]])[0] - (size / 2)

        })
        .attr("y", function(port) {

          return geoProperties.projection([port.geometry.coordinates[0], port.geometry.coordinates[1]])[1] - size

        })
        .style("width", size)
        .style("height", size)

}
