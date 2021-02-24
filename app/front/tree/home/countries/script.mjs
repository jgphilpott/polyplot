import {rainbow} from "../../../libs/mjs/colors/solid/rainbow.mjs"
import {makeScrollable} from "../../../libs/mjs/panels/events/scroll.mjs"
import {regionsColourSwitch} from "../../../libs/mjs/colors/switches/regions.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  $("body").append("<div id='countries' class='panel'><h1 id='name'>Countries by Region</h1></div>")

  let panel = $("#countries.panel")

  let countries = data.countries
  let countryExceptions = localRead("settings")["general"]["countryExceptions"]

  panel.append("<a href='/api/countries'><img id='api' src='/front/imgs/panels/countries/api.png'></a>")

  let alphabetBox = "<div id='alphabet'><p id='all' class='alphabet'>All</p>"
  let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

  for (let i = 0; i < alphabet.length; i++) {

    alphabetBox += "<p id=" + alphabet[i].toLowerCase() + " class='alphabet'>" + alphabet[i] + "</p>"

  }

  panel.append(alphabetBox + "</div>")

  socket.emit("get_meta", "regions")

  socket.on("new_regions", function(regions) {

    for (let i = 0; i < regions.length; i++) {

      let regionBox = "<div id='" + camalize(regions[i]) + "' class='region-box'><div class='head'>"

      regionBox += "<img class='fold' src='/front/imgs/panels/countries/fold.png'>"
      regionBox += "<h3 class='region-name'>" + regions[i] + "</h3>"

      if (countryExceptions.includes(camalize(regions[i]))) {
        regionBox += "<img class='region-visibility' src='/front/imgs/panels/countries/hidden.png'></div>"
      } else {
        regionBox += "<img class='region-visibility' src='/front/imgs/panels/countries/visible.png'></div>"
      }

      regionBox += "<div class='countries-box'></div>"

      panel.append(regionBox + "</div>")

      $("#" + camalize(regions[i]) + "").css("border-left", "5px solid " + regionsColourSwitch(regions[i]) + "")

    }

    for (let i = 0; i < countries.length; i++) {

      let countriesBox = $("#" + camalize(countries[i].region) + " .countries-box")

      let countryBox = "<div id='" + countries[i].code + "' class='country-box'>"

      if (countryExceptions.includes(countries[i].code)) {
        countryBox += "<img class='country-visibility' src='/front/imgs/panels/countries/hidden.png'>"
      } else {
        countryBox += "<img class='country-visibility' src='/front/imgs/panels/countries/visible.png'>"
      }

      countryBox += "<img class='flag' src='/front/imgs/flags/" + countries[i].code + ".png'>"
      countryBox += "<a href='/countries/" + countries[i].code + "'><div><p><b>" + countries[i].name + "</b></p>"
      countryBox += "<p>" + countries[i].formal_name + "</p></div></a></div>"

      countriesBox.append(countryBox)

    }

  })

  $(".alphabet").click(function(event) {

    if (this.id == "all") {

      $(".country-box").show()

    } else {

      for (let i = 0; i < countries.length; i++) {

        if (countries[i].name[0].toLowerCase() == this.id) {

          $("#" + countries[i].code + ".country-box").show()

        } else {

          $("#" + countries[i].code + ".country-box").hide()

        }

      }

    }

  })

  makeScrollable(panel)

})
