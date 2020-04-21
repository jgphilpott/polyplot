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

    clearAnimation()

    return false

  }

}

export function startAnimation(direction) {

  animatePlots(direction)

  $("#playForward").css({"visibility": "hidden"})
  $("#playBackward").css({"visibility": "hidden"})

  $("#pauseLeft").css({"visibility": "visible"})
  $("#pauseRight").css({"visibility": "visible"})

}

export function clearAnimation() {

  clearInterval(plot.animation.interval)
  plot.animation.status = "inactive"

  plot.animation.speedMultiplier = 1

  $("#playForward").css({"visibility": "visible"})
  $("#playBackward").css({"visibility": "visible"})

  $("#pauseLeft").css({"visibility": "hidden"})
  $("#pauseRight").css({"visibility": "hidden"})

  $("#fastForward").attr("src", "/front/imgs/time/fastForward.svg")
  $("#fastBackward").attr("src", "/front/imgs/time/fastBackward.svg")

}
