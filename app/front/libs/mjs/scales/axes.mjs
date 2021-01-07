import {drawAxes} from "../draw/axes.mjs"
import {findDomain} from "./domain.mjs"
import {red, yellow, green} from "../colors/solid/rainbow.mjs"
import {min, max, width, height} from "./range.mjs"

let plot = data.plot

export function scaleT(plotType=plot.type) {

  let timeline = $("#timeline")[0].width

  let minCap = $("#minCap")[0].width
  let point = $("#point")[0].width
  let maxCap = $("#maxCap")[0].width

  let range = [0, timeline - (minCap / 2) - point - (maxCap / 2)]
  let domain = [1960, 2020]

  plot.t.scale = d3.scaleLinear().range(range).domain(domain)

}

export function scaleR(plotType=plot.type) {

  let domain = findDomain("r")

  plot.r.min = domain[0]
  plot.r.max = domain[1]

  if (plotType == "Poly2") {

    plot.r.scale = d3.scaleLinear().range([width() / 200, width() / 20]).domain([plot.r.min, plot.r.max])

  } else if (plotType == "Poly3") {

    plot.r.scale = d3.scaleLinear().range([max / 200, max / 20]).domain([plot.r.min, plot.r.max])

  }

}

export function scaleX(plotType=plot.type) {

  let domain = findDomain("x")

  plot.x.min = domain[0]
  plot.x.max = domain[1]

  if (plotType == "Map") {

    plot.x.scale = d3.scaleLinear().range([red, yellow, green]).domain([plot.x.min, (plot.x.min + plot.x.max) / 2, plot.x.max])

  } else if (plotType == "Poly2") {

    plot.x.scale = d3.scaleLinear().range([0, width()]).domain([plot.x.min, plot.x.max])

  } else if (plotType == "Poly3") {

    plot.x.min = 0
    plot.x.max = absMaxValue(domain)
    plot.x.scale = d3.scaleLinear().range([-max, max]).domain([-plot.x.max, plot.x.max])

  }

}

export function scaleY(plotType=plot.type) {

  let domain = findDomain("y")

  plot.y.min = domain[0]
  plot.y.max = domain[1]

  if (plotType == "Poly2") {

    plot.y.scale = d3.scaleLinear().range([height(), 0]).domain([plot.y.min, plot.y.max])

  } else if (plotType == "Poly3") {

    plot.y.min = 0
    plot.y.max = absMaxValue(domain)
    plot.y.scale = d3.scaleLinear().range([-max, max]).domain([-plot.y.max, plot.y.max])

  }

}

export function scaleZ(plotType=plot.type) {

  let domain = findDomain("z")

  plot.z.min = 0
  plot.z.max = absMaxValue(domain)

  plot.z.scale = d3.scaleLinear().range([-max, max]).domain([-plot.z.max, plot.z.max])

}

export function scaleAxes(plotType=plot.type) {

  scaleX(plotType)

  if (plotType == "Poly2") {

    scaleR(plotType)
    scaleY(plotType)

  } else if (plotType == "Poly3") {

    scaleR(plotType)
    scaleY(plotType)
    scaleZ(plotType)

  }

  drawAxes(plotType)

}
