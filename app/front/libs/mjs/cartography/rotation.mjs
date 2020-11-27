import {drawMaps} from "../draw/maps.mjs"

export function startRotation() {

  let map = data.plot.GeoJSON.properties

  function rotate() {

    map.λ += 1

    $(".map").remove()
    drawMaps("miniMap", map.λ, map.φ, map.γ)

  }

  map.rotation = setInterval(rotate, 100)

}

export function stopRotation() {

  clearInterval(data.plot.GeoJSON.properties.rotation)

}
