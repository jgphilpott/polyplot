import {rainbow} from "../../../libs/mjs/colors/solid/rainbow.mjs"
import {addPanelEvents} from "../../../libs/mjs/panels/events/all.mjs"

import {toggleFold} from "../../../libs/mjs/panels/indicators.mjs"
import {addCategoryBoxes, addIndicatorBoxes} from "../../../libs/mjs/panels/indicators.mjs"
import {toggleIndicatorVisibility} from "../../../libs/mjs/panels/indicators.mjs"

let plot = data.plot
let plots = plot.plots

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  $("body").append("<div id='indicators' class='panel'><h1 id='name'>Indicators by Category</h1></div>")

  let panel = $("#indicators.panel")

  panel.append("<a href='/api/indicators'><img id='api' src='/front/imgs/panels/indicators/api.png'></a>")

  let stats = "<div id='stats-box'><h2>Stats</h2>"

  stats += "<p id='categories-stat'><span class='stat-label'>Categories:</span> </p>"
  stats += "<p id='indicators-stat'><span class='stat-label'>Indicators:</span> </p>"
  stats += "<p id='size-stat'><span class='stat-label'>Size:</span> </p></div>"

  let axes = "<div id='axes-box'><h2>Axes</h2>"

  axes += "<p id='r'><span id='r-key' class='axis-label'>R:</span> </p>"
  axes += "<p id='x'><span id='x-key' class='axis-label'>X:</span> </p>"
  axes += "<p id='y'><span id='y-key' class='axis-label'>Y:</span> </p>"
  axes += "<p id='z'><span id='z-key' class='axis-label'>Z:</span> </p></div>"

  panel.append(stats + axes)

  socket.emit("get_meta", "categories")

  socket.on("new_categories", function(categories) {

    $("#categories-stat").append("" + format(categories.length) + "")
    $("#indicators-stat").append("" + format(plots.length) + "")

    addCategoryBoxes(categories)
    addIndicatorBoxes(plots)

    $(".category-icon, .category-fold").click(function() {
      toggleFold(this, panel)
    })

    $(".indicator-visibility").click(function() {
      toggleIndicatorVisibility(this)
    })

  })

  addPanelEvents(panel, true)

})