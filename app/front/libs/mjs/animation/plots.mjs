import {animateMaps} from "./types/maps.mjs"
import {animateCircles} from "./types/circles.mjs"
import {animateSpheres} from "./types/spheres.mjs"
import {animateTimeline} from "./types/timeline.mjs"

let plot = data.plot
let plotType = plot.type

export function startAnimation(direction) {

  animatePlots(direction)

  $("#playForward").css({"visibility": "hidden"})
  $("#playBackward").css({"visibility": "hidden"})

  $("#pauseLeft").css({"visibility": "visible"})
  $("#pauseRight").css({"visibility": "visible"})

}

export function animatePlots(direction=plot.animation.direction, speed=(plot.animation.speed / plot.animation.speedMultiplier)) {

  plot.animation.direction = direction

  updatePlots()

  plot.animation.status = "active"
  plot.animation.interval = setInterval(updatePlots, speed)

}

export function updatePlots(speed=(plot.animation.speed / plot.animation.speedMultiplier)) {

  if (updateYear()) {

    animateTimeline(speed)

    if (plotType == "Map") {

      animateMaps(speed)

    } else if (plotType == "Poly2") {

      animateCircles(speed)

    } else if (plotType == "Poly3") {

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

    clearAnimation()

    return false

  }

}

export function clearAnimation() {

  clearInterval(plot.animation.interval)
  plot.animation.status = "inactive"

  $("#playForward").css({"visibility": "visible"})
  $("#playBackward").css({"visibility": "visible"})

  $("#pauseLeft").css({"visibility": "hidden"})
  $("#pauseRight").css({"visibility": "hidden"})

}
