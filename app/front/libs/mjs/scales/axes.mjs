import {drawAxes} from "../draw/axes.mjs"
import {findDomain} from "./domain.mjs"
import {red, yellow, green} from "../colors/solid/rainbow.mjs"
import {min, max, width, height} from "./range.mjs"

let plot = data.plot
let plots = plot.plots

export function scaleT(plotType=plot.type) {

  let timeline = $("#timeline")[0].width

  let minCap = $("#min-cap")[0].width
  let point = $("#point")[0].width
  let maxCap = $("#max-cap")[0].width

  plot.t.min = (plotType == "Country" || plotType == "Indicator") ? (plots.min_year) : (plots[0].min_year)
  plot.t.max = (plotType == "Country" || plotType == "Indicator") ? (plots.max_year) : (plots[0].max_year)

  plot.t.scale = d3.scaleLinear().range([0, timeline - (minCap / 2) - point - (maxCap / 2)]).domain([plot.t.min, plot.t.max])

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

export function scaleLine(plotType=plot.type) {

  plot.line = {}

  let linezone = $("svg#linezone")

  let domain = (plotType != "Indicator") ? (findDomain("x", plots)) : (findDomain("history", plots.countries))

  plot.line.min = domain[0]
  plot.line.max = domain[1]

  plot.line.x = d3.scaleLinear().range([0, linezone.width()]).domain([plot.t.minCap, plot.t.maxCap])
  plot.line.y = d3.scaleLinear().range([linezone.height(), 0]).domain([plot.line.min, plot.line.max])

}

export function scaleAxes(plotType=plot.type) {

  scaleT(plotType)

  if (plotType == "Map") {

    scaleX(plotType)
    scaleLine(plotType)

  } else if (plotType == "Poly2") {

    scaleR(plotType)
    scaleX(plotType)
    scaleY(plotType)

  } else if (plotType == "Poly3") {

    scaleR(plotType)
    scaleY(plotType)
    scaleX(plotType)
    scaleZ(plotType)

  } else if (plotType == "Indicator") {

    scaleLine(plotType)

  }

  drawAxes(plotType)

}