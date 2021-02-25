import {rainbow} from "../../../libs/mjs/colors/solid/rainbow.mjs"
import {makeScrollable} from "../../../libs/mjs/panels/events/scroll.mjs"

import {toggleFold} from "../../../libs/mjs/panels/countries.mjs"
import {addRegionBoxes, addCountryBoxes} from "../../../libs/mjs/panels/countries.mjs"
import {toggleRegionVisibility, toggleCountryVisibility} from "../../../libs/mjs/panels/countries.mjs"

let plot = data.plot
let plots = plot.plots

let countryExceptions = localRead("settings")["general"]["countryExceptions"]

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  $("body").append("<div id='countries' class='panel'><h1 id='name'>Countries by Region</h1></div>")

  let panel = $("#countries.panel")

  panel.append("<a href='/api/countries'><img id='api' src='/front/imgs/panels/countries/api.png'></a>")

  let alphabetBox = "<div id='alphabet'><p id='all' class='alphabet'>All</p>"
  let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

  for (let i = 0; i < alphabet.length; i++) {

    alphabetBox += "<p id=" + alphabet[i].toLowerCase() + " class='alphabet'>" + alphabet[i] + "</p>"

  }

  panel.append(alphabetBox + "</div>")

  socket.emit("get_meta", "regions")

  socket.on("new_regions", function(regions) {

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

  $(".alphabet").click(function(event) {

    $(".alphabet").css("font-weight", "normal")
    $(".alphabet").css("border-bottom", "3px solid rgba(224, 58, 62, 0)")

    $(this).css("font-weight", "bold")
    $(this).css("border-bottom", "3px solid rgba(224, 58, 62, 1)")

    if (this.id == "all") {

      $(".country-box").show()

    } else {

      for (let i = 0; i < plots.length; i++) {

        if (this.id == plots[i].name[0].toLowerCase()) {

          $("#" + plots[i].code + ".country-box").show()

        } else {

          $("#" + plots[i].code + ".country-box").hide()

        }

      }

    }

  })

  makeScrollable(panel)

})
