export function startRotation() {

  let canvas = d3.select("#miniMap")

  let map = data.plot.GeoJSON.properties

  function rotate() {

    map.λ += 1

    let rotation = d3.geoPath().projection(map.projection.rotate([map.λ, map.φ, map.γ]))

    canvas.selectAll(".map").attr("d", function(feature) {
      return rotation(feature)
    })

    canvas.selectAll(".graticule").attr("d", function(feature) {
      return rotation(feature)
    })

  }

  map.rotation = setInterval(rotate, 100)

}

export function stopRotation() {

  clearInterval(data.plot.GeoJSON.properties.rotation)

}
