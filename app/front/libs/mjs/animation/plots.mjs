import {animateMaps} from "./types/maps.mjs"
import {animateCircles} from "./types/circles.mjs"
import {animateSpheres} from "./types/spheres.mjs"
import {animateTimeline} from "./types/timeline.mjs"

let plot = data.plot

export function animatePlots(direction = plot.animation.direction, speed = (plot.animation.speed / plot.animation.speedMultiplier)) {

  plot.animation.direction = direction

  updatePlots()

  plot.animation.interval = setInterval(updatePlots, speed)
  plot.animation.status = "active"

}

export function updatePlots(speed = (plot.animation.speed / plot.animation.speedMultiplier)) {

  if (updateYear()) {

    animateTimeline(speed)

    if (plot.type == "Map") {

      animateMaps(speed)

    } else if (plot.type == "Poly2") {

      animateCircles(speed)

    } else if (plot.type == "Poly3") {

      animateSpheres(speed)

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

    $("#playForward").css({"visibility": "visible"})
    $("#playBackward").css({"visibility": "visible"})

    clearInterval(plot.animation.interval)
    plot.animation.status = "inactive"

    $("#pauseLeft").css({"visibility": "hidden"})
    $("#pauseRight").css({"visibility": "hidden"})

    return false

  }

}
