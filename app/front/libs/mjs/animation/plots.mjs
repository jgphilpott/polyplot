import {animateMaps} from "./types/maps.mjs"
import {animateCircles} from "./types/circles.mjs"
import {animateSpheres} from "./types/spheres.mjs"
import {animateTimeline} from "./types/timeline.mjs"

let plot = data.plot
let animation = null

export function animatePlots(direction) {

  plot.animation.direction = direction

  updatePlots()
  plot.animation.status = "active"
  animation = setInterval(updatePlots, plot.animation.speed)

}

export function updatePlots() {

  if (updateYear()) {

    animateTimeline()

    if (plot.type == "Map") {

      animateMaps()

    } else if (plot.type == "Poly2") {

      animateCircles()

    } else if (plot.type == "Poly3") {

      animateSpheres()

    }

  }

}

export function updateYear() {

  if (plot.animation.direction == "forward" && plot.t.year < plot.t.maxCap) {

    plot.t.year += 1
    return true

  } else if (plot.animation.direction == "backward" && plot.t.year > plot.t.minCap) {

    plot.t.year -= 1
    return true

  } else {

    clearInterval(animation)
    plot.animation.status = "inactive"
    return false

  }

}
