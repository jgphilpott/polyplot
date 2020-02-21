import {min, max} from "../env/dimensions.mjs"
import {linearScale} from "./linear.mjs"
import {absMaxValue, rangeAxis} from "./range.mjs"

let plot = data.plot

export function rScale(r) {

  return linearScale(r, [min, plot.r.max], [max / 150, max / 15])

}

export function xScale(x) {

  return linearScale(x, [-plot.x.max, plot.x.max], [-max, max])

}

export function yScale(y) {

  return linearScale(y, [-plot.y.max, plot.y.max], [-max, max])

}

export function zScale(z) {

  return linearScale(z, [-plot.z.max, plot.z.max], [-max, max])

}

export function scaleAll() {

  plot.r.min = 0
  plot.r.max = absMaxValue(rangeAxis("r"))
  plot.r.scale = rScale

  plot.x.min = 0
  plot.x.max = absMaxValue(rangeAxis("x"))
  plot.x.scale = xScale

  plot.y.min = 0
  plot.y.max = absMaxValue(rangeAxis("y"))
  plot.y.scale = yScale

  plot.z.min = 0
  plot.z.max = absMaxValue(rangeAxis("z"))
  plot.z.scale = zScale

}
