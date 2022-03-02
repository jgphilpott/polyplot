import {rainbow} from "../../../../libs/mjs/colors/solid/rainbow.mjs"
import {addAlphabetBox} from "../../../../libs/mjs/tools/alphabet.mjs"
import {addPanelEvents} from "../../../../libs/mjs/panels/events/all.mjs"
import {regionsColourSwitch} from "../../../../libs/mjs/colors/switches/regions.mjs"

import {toggleIndicatorVisibility} from "../../../../libs/mjs/panels/indicators.mjs"
import {toggleTextbox, addTextbox} from "../../../../libs/mjs/tools/textbox.mjs"

import {toggleFold} from "../../../../libs/mjs/panels/countries.mjs"
import {addLinePanel} from "../../../../libs/mjs/panels/line.mjs"
import {addTimePanel} from "../../../../libs/mjs/panels/time.mjs"
import {addRegionBoxes, addCountryBoxes} from "../../../../libs/mjs/panels/countries.mjs"
import {toggleRegionVisibility, toggleCountryVisibility} from "../../../../libs/mjs/panels/countries.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  let indicator = data.plot.plots

  $("body").append("<div id='indicator' class='panel'><h1 id='name'>" + indicator.name + "</h1></div>")

  let panel = $("#indicator.panel")

  let generalSettings = localRead("settings").general

  panel.append("<a href='/api/indicators/" + indicator.code + "'><img id='api' src='/front/imgs/panels/indicators/api.png'></a>")
  panel.append("<a href='https://data.worldbank.org/indicator/" + indicator.code + "'><img id='link' src='/front/imgs/panels/indicators/link.png'></a>")

  if (generalSettings.indicatorExceptions.includes(indicator.code)) {
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

  if (indicator.description) { addTextbox(panel, "indicator", "Description", indicator.description) }
  if (indicator.relevance) { addTextbox(panel, "indicator", "Relevance", indicator.relevance) }
  if (indicator.methodology) { addTextbox(panel, "indicator", "Methodology", indicator.methodology) }
  if (indicator.limitations) { addTextbox(panel, "indicator", "Limitations", indicator.limitations) }

  $(".textbox-fold").click(function() {
    toggleTextbox(this)
  })

  socket.emit("get_meta", "regions")

  socket.on("new_regions", function(regions) {

    panel.append("<h1><a href='/countries'>Countries by Region</a></h1>")

    addAlphabetBox(panel, indicator.countries)
    addRegionBoxes(regions)
    addCountryBoxes(indicator.countries)

    $(".region-fold").click(function() {
      toggleFold(this, panel)
    })

    $(".region-visibility").click(function() {
      toggleRegionVisibility(this)
    })

    $(".country-visibility").click(function() {
      toggleCountryVisibility(this)
    })

  })

  addLinePanel(true, panel)
  addTimePanel(true, panel)

  addPanelEvents(panel, true)

})