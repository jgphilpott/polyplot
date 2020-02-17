import {min, max} from "../env/dimensions.mjs"
import {linearScale} from "./linear.mjs"
import {absMaxValue, rangeAxis} from "./range.mjs"

export function rScale(r) {

  let rMax = absMaxValue(rangeAxis("r"))
  return linearScale(r, [min, rMax], [max / 150, max / 15])

}

export function xScale(x) {

  let xMax = absMaxValue(rangeAxis("x"))
  return linearScale(x, [-xMax, xMax], [-max, max])

}

export function yScale(y) {

  let yMax = absMaxValue(rangeAxis("y"))
  return linearScale(y, [-yMax, yMax], [-max, max])

}

export function zScale(z) {

  let zMax = absMaxValue(rangeAxis("z"))
  return linearScale(z, [-zMax, zMax], [-max, max])

}
