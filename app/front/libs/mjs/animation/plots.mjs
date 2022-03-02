import {animateMaps} from "./types/maps.mjs"
import {animateLines2} from "./types/lines2.mjs"
import {animateLines3} from "./types/lines3.mjs"
import {animatePanels} from "./types/panels.mjs"
import {animateCircles} from "./types/circles.mjs"
import {animateSpheres} from "./types/spheres.mjs"
import {animateTimeline} from "./types/timeline.mjs"

let plot = data.plot
let plotType = plot.type

export function startAnimation(direction=plot.animation.direction, speed=(plot.animation.speed / plot.animation.speedMultiplier)) {

  plot.animation.status = "active"
  plot.animation.direction = direction

  animate(speed)

  plot.animation.interval = setInterval(animate, speed)

  function animate(speed=(plot.animation.speed / plot.animation.speedMultiplier)) {

    if (updateYear()) {
      animateTimeline(speed)
      animationSwitch(speed)
    }

  }

  $("#play-forward").attr("src", "/front/imgs/panels/time/pause.svg")
  $("#play-backward").attr("src", "/front/imgs/panels/time/pause.svg")

}

export function clearAnimation() {

  clearInterval(plot.animation.interval)

  plot.animation.status = "inactive"

  $("#play-forward").attr("src", "/front/imgs/panels/time/play-forward.svg")
  $("#play-backward").attr("src", "/front/imgs/panels/time/play-backward.svg")

}

export function updateYear() {

  if (plot.animation.direction == "forward" && plot.t.year < plot.t.maxCap) {

    plot.t.year += 1

  } else if (plot.animation.direction == "backward" && plot.t.year > plot.t.minCap) {

    plot.t.year -= 1

  } else {

    clearAnimation()

    return false

  }

  writeCookie("year", plot.t.year)

  return true

}

export function animationSwitch(speed=(plot.animation.speed / plot.animation.speedMultiplier)) {

  animatePanels(speed)

  switch (plotType) {

    case "Map":
      animateMaps(speed)
      animateLines2(speed)
      break

    case "Poly2":
      animateCircles(speed)
      break

    case "Poly3":
      animateSpheres(speed)
      break

    case "Indicator":
      animateLines2(speed)
      break

  }

}