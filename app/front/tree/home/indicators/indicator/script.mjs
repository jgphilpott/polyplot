import {rainbow} from "../../../../libs/mjs/colors/solid/rainbow.mjs"
import {makeScrollable} from "../../../../libs/mjs/panels/events/scroll.mjs"
import {regionsColourSwitch} from "../../../../libs/mjs/colors/switches/regions.mjs"
import {toggleIndicatorVisibility} from "../../../../libs/mjs/panels/indicators.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  let indicator = data.plot.plots

  $("body").append("<div id='indicator' class='panel'><h1 id='name'>" + indicator.name + "</h1></div>")

  let panel = $("#indicator.panel")

  panel.append("<a href='/api/indicators/" + indicator.code + "'><img id='api' src='/front/imgs/panels/indicators/api.png'></a>")
  panel.append("<a href='https://data.worldbank.org/indicator/" + indicator.code + "'><img id='link' src='/front/imgs/panels/indicators/link.png'></a>")

  if (localRead("settings").general.indicatorExceptions.includes(indicator.code)) {
    panel.append("<img id='visibility' src='/front/imgs/panels/indicators/visible.png'>")
  } else {
    panel.append("<img id='visibility' src='/front/imgs/panels/indicators/hidden.png'>")
  }

  $("#visibility").click(function() {
    toggleIndicatorVisibility(this)
  })

  let stats = "<div id='stats-box'><h2>Stats</h2>"

  stats += "<svg id='completeness'></svg>"
  stats += "<p><b>Min Value:</b> " + format(indicator.min_value, "oodles") + "</p>"
  stats += "<p><b>Max Value:</b> " + format(indicator.max_value, "oodles") + "</p>"
  stats += "<br>"
  stats += "<p><b>Updated:</b> " + indicator.last_updated + "</p>"
  stats += "<p><b>Size:</b> " + format(indicator.size, "data") + "</p></div>"

  let categories = "<div id='categories-box'>"

  if (indicator.categories.length > 1) {
    categories += "<h2>Categories</h2>"
  } else {
    categories += "<h2>Category</h2>"
  }

  for (let i = 0; i < indicator.categories.length; i++) {

    categories += "<div class='category-box'>"
    categories += "<img class='category-icon' src='/front/imgs/panels/indicators/categories/" + camalize(indicator.categories[i]) + ".png'>"
    categories += "<p class='category-name'><b>" + indicator.categories[i] + "</b></p></div>"

  }

  categories += "</div>"

  panel.append(stats + categories)

  let pie = d3.pie().sort(null)
  let arc = d3.arc().innerRadius(60).outerRadius(75)

  d3.select("svg")
    .selectAll("#completeness")
    .data(pie([indicator.completeness, 100 - indicator.completeness]))
    .enter()
    .append("path")
    .attr("d", arc)
    .attr("transform", "translate(75, 75)")
    .style("fill", function(data) {

      let scale = d3.scaleLinear().range(["red", "orange", "green"]).domain([0, 50, 100])

      return [scale(indicator.completeness), "none"][data.index]

    })

  d3.select("svg")
    .selectAll(".label-percent")
    .data([indicator.completeness])
    .enter()
    .append("text")
    .text(format(indicator.completeness, "percent"))
    .attr("transform", "translate(75, 75)")
    .style("font-size", "22px")
    .style("text-anchor", "middle")

  d3.select("svg")
    .selectAll(".label-name")
    .data([indicator.completeness])
    .enter()
    .append("text")
    .text("Complete")
    .attr("transform", "translate(75, 75)")
    .style("font-size", "16px")
    .style("text-anchor", "middle")
    .attr("dy", "1.5em")

  if (indicator.description) {
    panel.append("<p><b>Description:</b></p>")
    panel.append("<p>" + indicator.description + "</p><br>")
  }

  if (indicator.relevance) {
    panel.append("<p><b>Relevance:</b></p>")
    panel.append("<p>" + indicator.relevance + "</p><br>")
  }

  if (indicator.methodology) {
    panel.append("<p><b>Methodology:</b></p>")
    panel.append("<p>" + indicator.methodology + "</p><br>")
  }

  if (indicator.limitations) {
    panel.append("<p><b>Limitations:</b></p>")
    panel.append("<p>" + indicator.limitations + "</p><br>")
  }

    // panel.append("<svg class='graph'></svg>")

  //   let graphWidth = panel.width() - 100
  //   let graphHeight = graphWidth / 2
  //   let graphMargin = 20
  //
  //   $(".graph").width(graphWidth).height(graphHeight)
  //
  //   let xDomain = []
  //   let yDomain = []
  //
  //   for (let i = 0; i < indicator.countries.length; i++) {
  //     for (let j = 0; j < indicator.countries[i].history.length; j++) {
  //       if (typeof(indicator.countries[i].history[j].year) == "number" && typeof(indicator.countries[i].history[j].value) == "number") {
  //
  //         xDomain.push(indicator.countries[i].history[j].year)
  //         yDomain.push(indicator.countries[i].history[j].value)
  //
  //       }
  //     }
  //   }
  //
  //   let xMin = minValue(xDomain)
  //   let xMax = maxValue(xDomain)
  //
  //   let yMin = minValue(yDomain)
  //   let yMax = maxValue(yDomain)
  //
  //   let xScale = d3.scaleLinear().range([0, graphWidth - (graphMargin * 2)]).domain([xMin, xMax])
  //   let yScale = d3.scaleLinear().range([graphHeight - (graphMargin * 2), 0]).domain([yMin, yMax])
  //
  //   d3.select(".graph")
  //     .append("g")
  //     .attr("id", "xAxis")
  //     .attr("class", "axis")
  //     .attr("transform", "translate(" + graphMargin + ", " + (graphHeight - graphMargin) + ")")
  //     .call(d3.axisBottom(xScale)
  //             .tickFormat(d3.format("d"))
  //             .tickSize(-graphHeight + (graphMargin * 2))
  //             .tickSizeOuter(0)
  //             .ticks(5))
  //
  //   d3.select(".graph")
  //     .append("g")
  //     .attr("id", "yAxis")
  //     .attr("class", "axis")
  //     .attr("transform", "translate(" + graphMargin + ", " + graphMargin + ")")
  //     .call(d3.axisLeft(yScale)
  //             .tickSize(-graphWidth + (graphMargin * 2))
  //             .tickSizeOuter(0)
  //             .ticks(5))
  //
  //   let pathGenerator = d3.line()
  //                         .x(function(data) {
  //                           return xScale(data.year)
  //                         })
  //                         .y(function(data) {
  //                           return yScale(data.value)
  //                         })
  //
  //   for (let i = 0; i < indicator.countries.length; i++) {
  //
  //     d3.select(".graph")
  //       .selectAll(".line")
  //       .data([indicator.countries[i]])
  //       .enter()
  //       .append("path")
  //       .attr("d", function(data) {
  //
  //         return pathGenerator(data.history.filter(function(data) { return typeof(data.year) == "number" && typeof(data.value) == "number" }))
  //
  //       })
  //       .attr("transform", "translate(" + graphMargin + ", " + graphMargin + ")")
  //       .attr("stroke", "black")
  //       .attr("fill", "none")
  //
  //     let country = "<div class='country'>"
  //
  //     country += "<img class='flag' src='/front/imgs/flags/" + indicator.countries[i].code + ".png'>"
  //     country += "<a href='/countries/" + indicator.countries[i].code + "'><h3>" + indicator.countries[i].name + "</h3><a>"
  //     country += "<p> - <b>" + format(indicator.countries[i].history.find(date => date.year == readCookie("year")).value) + "</b></p></div>"
  //
  //     panel.append(country)
  //
  //   }

  makeScrollable(panel)

})
