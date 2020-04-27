import {black as solidBlack} from "../solid/grayscale.mjs"
import {rainbow as solidRainbow} from "../solid/rainbow.mjs"

import {black as threeBlack} from "../three/grayscale.mjs"
import {rainbow as threeRainbow} from "../three/rainbow.mjs"

export function regionsColourSwitch(region, type = null) {

  let black = null
  let rainbow = null

  if (data.plot.type == "Poly3" && type != "miniMap") {

    black = threeBlack
    rainbow = threeRainbow

  } else {

    black = solidBlack
    rainbow = solidRainbow

  }

  if (region == "Europe & Central Asia") {

    return rainbow[0]

  } else if (region == "Latin America & Caribbean") {

    return rainbow[1]

  } else if (region == "South Asia") {

    return rainbow[2]

  } else if (region == "Midle East & North Africa") {

    return rainbow[3]

  } else if (region == "East Asia & Pacific") {

    return rainbow[4]

  } else if (region == "North America") {

    return rainbow[5]

  } else if (region == "Sub-Saharan Africa") {

    return rainbow[6]

  } else {

    return black

  }

}
