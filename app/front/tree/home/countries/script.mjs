import {rainbow} from "../../../libs/mjs/colors/solid/rainbow.mjs"
import {addAlphabetBox} from "../../../libs/mjs/tools/alphabet.mjs"
import {addPanelEvents} from "../../../libs/mjs/panels/events/all.mjs"

import {toggleFold} from "../../../libs/mjs/panels/countries.mjs"
import {addRegionBoxes, addCountryBoxes} from "../../../libs/mjs/panels/countries.mjs"
import {toggleRegionVisibility, toggleCountryVisibility} from "../../../libs/mjs/panels/countries.mjs"

let plot = data.plot
let plots = plot.plots

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  $("body").append("<div id='countries' class='panel'><h1 id='name'>Countries by Region</h1></div>")

  let panel = $("#countries.panel")

  panel.append("<a href='/api/countries'><img id='api' src='/front/imgs/panels/countries/api.png'></a>")

  socket.emit("get_meta", "regions")

  socket.on("new_regions", function(regions) {

    addAlphabetBox(panel, plots)
    addRegionBoxes(regions)
    addCountryBoxes(plots)

    rotate($(".region-fold"), 90, 0)

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

  addPanelEvents(panel, true)

})
