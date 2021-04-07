import {drawAxes} from "../draw/axes.mjs"
import {scaleLine} from "../scales/axes.mjs"
import {drawLine2} from "../draw/lines2.mjs"

import {addPanelEvents} from "./events/all.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"

let plot = data.plot
let plots = plot.plots
let plotType = plot.type

export function addLinePanel(panelSetting, parentPanel=null) {

  let linePanel = "<div id='line' class='panel'></div>"
  let floatingPanel = (plotType != "Indicator")

  if (floatingPanel) { $("body").append(linePanel) } else { parentPanel.append(linePanel) }

  let panel = $("#line.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  if (floatingPanel) { panel.append("<h1 id='name'>" + plot.x.name + "</h1>") }

  let regression = ""

  regression += "<input type='radio' id='lin-reg' class='reg-radio' name='reg' value='1'>"
  regression += "<label for='lin-reg'>linReg</label>"
  regression += "<input type='radio' id='poly-reg-2' class='reg-radio' name='reg' value='2'>"
  regression += "<label for='poly-reg-2'>polyReg2</label>"
  regression += "<input type='radio' id='poly-reg-3' class='reg-radio' name='reg' value='3'>"
  regression += "<label for='poly-reg-3'>polyReg3</label>"

  let tangent = "<input type='checkbox' id='tan' class='tan-chk'><label>Show Tangent</label>"

  panel.append("<div id='reg-and-tan'>" + regression + tangent + "</div>")

  regression = $("input[name=reg]:checked").val()

  panel.append("<svg id='lineplot'></svg>")
  panel.append("<svg id='linezone'></svg>")

  scaleLine(plotType)
  drawAxes(plotType)

  let xRegVals = []
  let yRegVals = []

  let countries = (plotType != "Indicator") ? (plots) : (plots.countries)

  for (let i = 0; i < countries.length; i++) {

    let vertices = (plotType != "Indicator") ? (countries[i].x) : (countries[i].history)

    vertices = vertices.filter(function(vertex) {
      if (typeof(vertex.year) == "number" && typeof(vertex.value) == "number") {

        xRegVals.push(data.year)
        yRegVals.push(data.value)

        return vertex

      }
    })

    drawLine2(vertices, regionsColourSwitch(countries[i].region), countries[i].code)

  }

  drawLine2([{"year": plot.t.year, "value": plot.line.min}, {"year": plot.t.year, "value": plot.line.max}], regionsColourSwitch(null), "track")

  // $(".reg-radio").click(function(event) {
  //
  //   $(".regLine").remove()
  //
  //   if (this.value == regression) {
  //
  //     this.checked = false
  //
  //   } else {
  //
  //     let coefficients = polyfit(xRegVals, yRegVals, parseInt(this.value))
  //
  //     d3.select("#lineGraph")
  //       .selectAll(".regLine")
  //       .data([0])
  //       .enter()
  //       .append("path")
  //       .attr("class", "regLine")
  //       .attr("d", function() {
  //
  //         let regVals = []
  //
  //         for (let i = plot.t.minCap; i <= plot.t.maxCap; i++) {
  //
  //           regVals.push({"year": i, "value": predict(i, coefficients)})
  //
  //         }
  //
  //         return pathGenerator(regVals)
  //
  //       })
  //       .attr("transform", "translate(" + graphMargin + ", " + graphMargin + ")")
  //       .attr("stroke", "black")
  //       .attr("fill", "none")
  //
  //   }
  //
  //   regression = $("input[name=reg]:checked").val()
  //
  // })

  if (floatingPanel) { addPanelEvents(panel) }

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}
