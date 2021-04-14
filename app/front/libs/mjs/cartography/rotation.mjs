let plot = data.plot
let plots = data.plots

export function startRotation() {

  let map = plot.GeoJSON.properties
  let canvas = d3.select("#mini-map")

  function rotate() {

    map.λ += 1

    let rotation = d3.geoPath().projection(map.projection.rotate([map.λ, map.φ, map.γ]))

    canvas.selectAll(".graticule").attr("d", function(graticule) { return rotation(graticule) })
    canvas.selectAll(".map").attr("d", function(map) { return rotation(map) })

  }

  map.rotation = setInterval(rotate, 100)

}

export function stopRotation() {

  clearInterval(plot.GeoJSON.properties.rotation)

}
