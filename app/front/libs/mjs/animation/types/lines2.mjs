import {drawLine2} from "../../draw/lines2.mjs"
import {regionsColourSwitch} from "../../colors/switches/regions.mjs"
import {getVertices, newRegression, newTangent} from "../../tools/lineplot.mjs"

let plot = data.plot
let plots = plot.plots

export function animateLines2(duration) {

  let generalSettings = data.client.settings.general

  plot.line.generator = d3.line()
                          .x(function(vertex) { return plot.line.x(vertex.year) })
                          .y(function(vertex) { return plot.line.y(vertex.value) })

  d3.select("#track.line")
    .transition()
    .ease(d3.easeLinear)
    .duration(duration)
    .attr("d", plot.line.generator([{"year": plot.t.year, "value": plot.line.min}, {"year": plot.t.year, "value": plot.line.max}]))

  plot.line.xRegVals = []
  plot.line.yRegVals = []

  let lines = (plot.type != "Indicator") ? (plots) : (plots.countries)

  for (let i = 0; i < lines.length; i++) {

    if (generalSettings.countryExceptions.includes(lines[i].code) != true) {

      if ($("#" + lines[i].code + ".line").length) {

        d3.select("#" + lines[i].code + ".line")
          .transition()
          .ease(d3.easeLinear)
          .duration(duration)
          .attr("d", plot.line.generator(getVertices(lines[i])))

      } else {

        drawLine2(getVertices(lines[i]), regionsColourSwitch(lines[i].region), lines[i].code)

        d3.select("#track.line").setAsFrontLayer()
        d3.select("#regression.line").setAsFrontLayer()
        d3.select("#tangent.line").setAsFrontLayer()

      }

    } else { $("#" + lines[i].code + ".line").remove() }

  }

  if (generalSettings.regression) {

    d3.select("#regression.line")
      .transition()
      .ease(d3.easeLinear)
      .duration(duration)
      .attr("d", plot.line.generator(newRegression(generalSettings.regression)))

      if (generalSettings.tangent) {

        d3.select("#tangent.line")
          .transition()
          .ease(d3.easeLinear)
          .duration(duration)
          .attr("d", plot.line.generator(newTangent()))

      }

  }

}