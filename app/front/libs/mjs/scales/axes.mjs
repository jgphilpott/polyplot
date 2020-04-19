import {min, max, width, height} from "../env/dimensions.mjs"
import {minValue, maxValue, absMinValue, absMaxValue, rangeAxis} from "./range.mjs"
import {red, yellow, green} from "../colors/solid/rainbow.mjs"

let plot = data.plot

export function scaleAxes() {

  let timeLine = $("#line")[0].width

  let minCap = $("#minCap")[0].width
  let maxCap = $("#maxCap")[0].width

  let timeRange = timeLine - minCap - maxCap - 1

  plot.t.scale = d3.scaleLinear().range([0, timeRange]).domain([plot.t.minCap, plot.t.maxCap])

  if (plot.type == "Map") {

    plot.x.min = rangeAxis("x")[0]
    plot.x.max = rangeAxis("x")[1]
    plot.x.scale = d3.scaleLinear().range([red, yellow, green]).domain([plot.x.min, plot.x.max / 2, plot.x.max])

  } else if (plot.type == "Poly2") {

    plot.r.min = rangeAxis("r")[0]
    plot.r.max = rangeAxis("r")[1]
    plot.r.scale = d3.scaleLinear().range([width() / 200, width() / 20]).domain([plot.r.min, plot.r.max])

    plot.x.min = rangeAxis("x")[0]
    plot.x.max = rangeAxis("x")[1]
    plot.x.scale = d3.scaleLinear().range([0, width()]).domain([plot.x.min, plot.x.max])

    plot.y.min = rangeAxis("y")[0]
    plot.y.max = rangeAxis("y")[1]
    plot.y.scale = d3.scaleLinear().range([height(), 0]).domain([plot.y.min, plot.y.max])

  } else if (plot.type == "Poly3") {

    plot.r.min = 0
    plot.r.max = absMaxValue(rangeAxis("r"))
    plot.r.scale = d3.scaleLinear().range([max / 200, max / 20]).domain([min, plot.r.max])

    plot.x.min = 0
    plot.x.max = absMaxValue(rangeAxis("x"))
    plot.x.scale = d3.scaleLinear().range([-max, max]).domain([-plot.x.max, plot.x.max])

    plot.y.min = 0
    plot.y.max = absMaxValue(rangeAxis("y"))
    plot.y.scale = d3.scaleLinear().range([-max, max]).domain([-plot.y.max, plot.y.max])

    plot.z.min = 0
    plot.z.max = absMaxValue(rangeAxis("z"))
    plot.z.scale = d3.scaleLinear().range([-max, max]).domain([-plot.z.max, plot.z.max])

  }

}
