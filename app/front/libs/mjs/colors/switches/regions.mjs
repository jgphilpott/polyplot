import {rainbow} from "../three/rainbow.mjs"
import {black} from "../three/grayscale.mjs"

export function regionsColourSwitch(region) {

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
