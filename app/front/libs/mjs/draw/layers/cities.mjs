let plot = data.plot

export function drawCities(canvas, cities=plot.GeoJSON.properties.layers.cities) {

  let geoProperties = plot.GeoJSON.properties
  let checkpoint = geoProperties.layers.checkpoint

  $(".city").remove()

  canvas.selectAll(".city-point")
        .data(cities.filter(function(city) { return city.properties.rank <= checkpoint }))
        .enter()
        .append("circle")
        .attr("class", "city city-point")
        .attr("transform", geoProperties.zoom)
        .attr("cx", function(city) {

          return geoProperties.projection([city.geometry.coordinates[0], city.geometry.coordinates[1]])[0]

        })
        .attr("cy", function(city) {

          return geoProperties.projection([city.geometry.coordinates[0], city.geometry.coordinates[1]])[1]

        })
        .attr("r", function() { return [1, 0.5, 0.25, 0.125, 0.0625, 0.03125][checkpoint - 1] })

  canvas.selectAll(".city-label")
        .data(cities.filter(function(city) { return city.properties.rank <= checkpoint }))
        .enter()
        .append("text")
        .text(function(city) { return city.properties.name })
        .attr("class", "city city-label")
        .attr("transform", geoProperties.zoom)
        .attr("x", function(city) {

          return geoProperties.projection([city.geometry.coordinates[0], city.geometry.coordinates[1]])[0]

        })
        .attr("y", function(city) {

          return geoProperties.projection([city.geometry.coordinates[0], city.geometry.coordinates[1]])[1]

        })
        .attr("font-size", function(city) {

          let textSizes = [10, 5, 2.5, 1.25, 0.625, 0.3125]
          let sizeMultipliers = [1, 0.95, 0.9, 0.85, 0.8, 0.75]

          return (textSizes[checkpoint - 1] * sizeMultipliers[city.properties.rank - 1]) + "px"

        })
        .attr("text-anchor", "middle")
        .attr("dy", "-0.5em")

}
