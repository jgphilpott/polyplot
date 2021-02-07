import {addPanelEvents} from "./events/all.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"

let plot = data.plot
let plots = plot.plots

export function addLinePanel(panelSetting) {

  $("body").append("<div id='line' class='panel'></div>")

  let panel = $("#line.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='name'>" + plot.x.name + "</h1>")

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

  panel.append("<svg id='lineGraph'></svg>")

  let graphWidth = 500
  let graphHeight = 300
  let graphMargin = 50

  let xScale = d3.scaleLinear().range([0, graphWidth - (graphMargin * 2)]).domain([plot.t.minCap, plot.t.maxCap])
  let yScale = d3.scaleLinear().range([graphHeight - (graphMargin * 2), 0]).domain([plot.x.min, plot.x.max])

  d3.select("#lineGraph")
    .append("g")
    .attr("id", "xAxis")
    .attr("class", "axis")
    .attr("transform", "translate(" + graphMargin + ", " + (graphHeight - graphMargin) + ")")
    .call(d3.axisBottom(xScale)
            .tickFormat(d3.format("d"))
            .tickSize(-graphHeight + (graphMargin * 2))
            .tickSizeOuter(0)
            .ticks(5))

  d3.select("#lineGraph")
    .append("g")
    .attr("id", "yAxis")
    .attr("class", "axis")
    .attr("transform", "translate(" + graphMargin + ", " + graphMargin + ")")
    .call(d3.axisLeft(yScale)
            .tickSize(-graphWidth + (graphMargin * 2))
            .tickSizeOuter(0)
            .ticks(5))

  let pathGenerator = d3.line()
                        .x(function(data) {
                          return xScale(data.year)
                        })
                        .y(function(data) {
                          return yScale(data.value)
                        })

  let xRegVals = []
  let yRegVals = []

  for (let i = 0; i < plots.length; i++) {

    d3.select("#lineGraph")
      .selectAll(".line")
      .data([plots[i]])
      .enter()
      .append("path")
      .attr("d", function(data) {

        let dataVals = data.x.filter(function(data) {
          if (typeof(data.year) == "number" && typeof(data.value) == "number") {

            xRegVals.push(data.year)
            yRegVals.push(data.value)

            return data

          }
        })

        return pathGenerator(dataVals)

      })
      .attr("transform", "translate(" + graphMargin + ", " + graphMargin + ")")
      .attr("stroke", function(data) {

        return regionsColourSwitch(data.region)

      })
      .attr("fill", "none")

  }

  $(".reg-radio").click(function(event) {

    $(".regLine").remove()

    if (this.value == regression) {

      this.checked = false

    } else {

      let coefficients = polyfit(xRegVals, yRegVals, parseInt(this.value))

      d3.select("#lineGraph")
        .selectAll(".regLine")
        .data([0])
        .enter()
        .append("path")
        .attr("class", "regLine")
        .attr("d", function() {

          let regVals = []

          for (let i = plot.t.minCap; i <= plot.t.maxCap; i++) {

            regVals.push({"year": i, "value": predict(i, coefficients)})

          }

          return pathGenerator(regVals)

        })
        .attr("transform", "translate(" + graphMargin + ", " + graphMargin + ")")
        .attr("stroke", "black")
        .attr("fill", "none")

    }

    regression = $("input[name=reg]:checked").val()

  })

  addPanelEvents(panel)

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}
