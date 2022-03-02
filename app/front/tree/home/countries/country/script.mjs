import {rainbow} from "../../../../libs/mjs/colors/solid/rainbow.mjs"
import {orthographic} from "../../../../libs/mjs/cartography/projections.mjs"
import {addPanelEvents} from "../../../../libs/mjs/panels/events/all.mjs"
import {regionsColourSwitch} from "../../../../libs/mjs/colors/switches/regions.mjs"

import {drawMaps} from "../../../../libs/mjs/draw/maps.mjs"
import {addTimePanel} from "../../../../libs/mjs/panels/time.mjs"
import {toggleCountryVisibility} from "../../../../libs/mjs/panels/countries.mjs"
import {toggleTextbox, addTextbox} from "../../../../libs/mjs/tools/textbox.mjs"
import {toggleFold, addCategoryBoxes, addIndicatorBoxes} from "../../../../libs/mjs/panels/indicators.mjs"

let plot = data.plot
let plots = plot.plots

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  let country = plots

  $("body").append("<div id='country' class='panel'><h1 id='name'>" + country.name + "</h1></div>")

  let panel = $("#country.panel")

  let generalSettings = localRead("settings").general

  panel.css("border", "2px solid " + regionsColourSwitch(country.region) + "")

  panel.append("<a href='/api/countries/" + country.code + "'><img id='api' src='/front/imgs/panels/countries/api.png'></a>")
  panel.append("<a href='" + country.wiki + "'><img id='wiki' src='/front/imgs/panels/countries/wiki.png'></a>")

  if (generalSettings.countryExceptions.includes(country.code)) {
    panel.append("<img id='visibility' src='/front/imgs/panels/countries/hidden.png'>")
  } else {
    panel.append("<img id='visibility' src='/front/imgs/panels/countries/visible.png'>")
  }

  $("#visibility").click(function() {
    toggleCountryVisibility(this)
  })

  panel.append("<svg id='mini-map'></svg>")

  panel.append("<img id='flag' src='/front/imgs/flags/" + country.code + ".png'>")
  panel.append("<p class='stat'><b>Formal Name:</b> " + country.formal_name + "</p>")
  panel.append("<p class='stat'><b>Region:</b> " + country.region + "</p>")

  addTextbox(panel, "country", "Description", country.description)

  $(".textbox-fold").click(function() {
    toggleTextbox(this)
  })

  socket.emit("get_maps", {}, {"_id": 0}, [["properties.code", 1]], 0, "micro")

  socket.on("new_maps", function(maps) {

    plot.GeoJSON = {"type": "FeatureCollection", "features": maps, "properties": {"centroid": country.centroid}}

    drawMaps("mini-map")

  })

  socket.emit("get_meta", "categories")

  socket.on("new_categories", function(categories) {

    panel.append("<h1><a href='/indicators'>Indicators by Category</a></h1>")

    let indicators = Object.keys(country.indicators).filter(key => generalSettings.indicatorExceptions.includes(key.replaceAll("-", ".")))
    indicators = Object.values(indicators.reduce((obj, key) => { obj[key] = country.indicators[key]; return obj }, {})).sort((a, b) => a.name.localeCompare(b.name))

    addCategoryBoxes(categories)
    addIndicatorBoxes(indicators)

    $(".category-icon, .category-fold").click(function() {
      toggleFold(this, panel)
    })

  })

  addTimePanel(true, panel)

  addPanelEvents(panel, true)

})