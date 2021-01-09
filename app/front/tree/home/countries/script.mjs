import {rainbow} from "../../../libs/mjs/colors/solid/rainbow.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  $("body").append("<div id='countries' class='panel'><h1 id='name'>Countries by Region</h1></div>")

  let panel = $("#countries.panel")

  let alphabetBox = "<div id='alphabet'><p id='all'>All</p>"
  let alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

  for (let i = 0; i < alphabet.length; i++) {

    alphabetBox += "<p id=" + alphabet[i].toLowerCase() + ">" + alphabet[i] + "</p>"

  }

  alphabetBox += "</div>"

  panel.append(alphabetBox)

})
