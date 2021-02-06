import {rainbow} from "../../../libs/mjs/colors/solid/rainbow.mjs"
import {makeScrollable} from "../../../libs/mjs/panels/events/scroll.mjs"
import {regionsColourSwitch} from "../../../libs/mjs/colors/switches/regions.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  $("body").append("<div id='countries' class='panel'><a href='/api/countries'><h1 id='name'>Countries by Region</h1></a></div>")

  let panel = $("#countries.panel")

  let alphabetBox = "<div id='alphabet'><p id='all'>All</p>"
  let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

  for (let i = 0; i < alphabet.length; i++) {

    alphabetBox += "<p id=" + alphabet[i].toLowerCase() + ">" + alphabet[i] + "</p>"

  }

  panel.append(alphabetBox + "</div>")

  socket.emit("get_meta", "regions")

  socket.on("new_regions", function(regions) {

    let countries = data.countries

    for (let i = 0; i < regions.length; i++) {

      panel.append("<h2 id='" + camalize(regions[i]) + "' class='region'>" + regions[i] + "</h2>")

      $("#" + camalize(regions[i]) + "").css("border-left", "5px solid " + regionsColourSwitch(regions[i]) + "")

      let countriesBox = "<div class='countries-box'>"

      for (let j = 0; j < countries.length; j++) {

        if (regions[i] == countries[j].region) {

          countriesBox += "<a href='/countries/" + countries[j].code + "'><div class='country-box'>"
          countriesBox += "<img class='flag' src='/front/imgs/flags/" + countries[j].code + ".png'>"
          countriesBox += "<div><p><b>" + countries[j].name + "</b></p>"
          countriesBox += "<p>" + countries[j].formal_name + "</p></div></div></a>"

        }

      }

      panel.append(countriesBox + "</div>")

    }

  })

  makeScrollable(panel)

})
