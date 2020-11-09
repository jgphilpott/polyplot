import {drawMaps} from "../draw/maps.mjs"

export function rotateMap() {

  let λ = 0
  let φ = 0
  let γ = 0

  function rotate() {

    λ += 1

    $(".map").remove()
    drawMaps("miniMap", λ, φ, γ)

  }

  setInterval(rotate, 100)

}
