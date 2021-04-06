import {findDomain} from "../scales/domain.mjs"
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

  let lineplot = $("svg#lineplot")
  let linezone = $("svg#linezone")

  let graphWidth = linezone.width()
  let graphHeight = linezone.height()
  let graphMargin = Number(linezone.css("padding").replace(/[a-z]/gi, ""))

  let domain = (floatingPanel) ? (findDomain("x", plots)) : (findDomain("history", plots.countries))

  let xScale = d3.scaleLinear().range([0, graphWidth]).domain([plot.t.minCap, plot.t.maxCap])
  let yScale = d3.scaleLinear().range([graphHeight, 0]).domain([domain[0], domain[1]])

  d3.select("#lineplot")
    .append("g")
    .attr("id", "x-axis")
    .attr("class", "axis")
    .attr("transform", "translate(" + graphMargin + ", " + (graphHeight + graphMargin) + ")")
    .call(d3.axisBottom(xScale)
            .tickFormat(d3.format("d"))
            .tickSize(-graphHeight)
            .tickSizeOuter(0)
            .ticks(7))

  d3.select("#lineplot")
    .append("g")
    .attr("id", "y-axis")
    .attr("class", "axis")
    .attr("transform", "translate(" + graphMargin + ", " + graphMargin + ")")
    .call(d3.axisLeft(yScale)
            .tickFormat(function(tick) { return format(tick, "oodles") })
            .tickSize(-graphWidth)
            .tickSizeOuter(0)
            .ticks(7))

  let pathGenerator = d3.line()
                        .x(function(data) {
                          return xScale(data.year)
                        })
                        .y(function(data) {
                          return yScale(data.value)
                        })

  // let xRegVals = []
  // let yRegVals = []
  //
  // for (let i = 0; i < plots.length; i++) {
  //
  //   d3.select("#lineGraph")
  //     .selectAll(".line")
  //     .data([plots[i]])
  //     .enter()
  //     .append("path")
  //     .attr("d", function(data) {
  //
  //       let dataVals = data.x.filter(function(data) {
  //         if (typeof(data.year) == "number" && typeof(data.value) == "number") {
  //
  //           xRegVals.push(data.year)
  //           yRegVals.push(data.value)
  //
  //           return data
  //
  //         }
  //       })
  //
  //       return pathGenerator(dataVals)
  //
  //     })
  //     .attr("transform", "translate(" + graphMargin + ", " + graphMargin + ")")
  //     .attr("stroke", function(data) {
  //
  //       return regionsColourSwitch(data.region)
  //
  //     })
  //     .attr("fill", "none")
  //
  // }
  //
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
