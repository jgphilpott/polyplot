import {animateMaps} from "./types/maps.mjs"
import {animateCircles} from "./types/circles.mjs"
import {animateSpheres} from "./types/spheres.mjs"

export function animatePlots(direction, speed=1200) {

  if (data.plot.type == "Map") {

    animateMaps()

  } else if (data.plot.type == "Poly2") {

    animateCircles()

  } else if (data.plot.type == "Poly3") {

    animateSpheres()

  }

}
