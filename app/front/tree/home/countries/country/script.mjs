import {rainbow} from "../../../../libs/mjs/colors/solid/rainbow.mjs"
import {regionsColourSwitch} from "../../../../libs/mjs/colors/switches/regions.mjs"
import {makeScrollable} from "../../../../libs/mjs/panels/events/scroll.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  let country = data.country

  $("body").append("<div id='country' class='panel'><a href='/api/countries/" + country.code + "'><h1 id='name'>" + country.name + "</h1></a></div>")

  let panel = $("#country.panel")

  panel.append("<img class='flag' src='/front/imgs/flags/" + country.code + ".png'>")
  panel.append("<p><b>Formal Name:</b> " + country.formal_name + "</p>")
  panel.append("<p><b>Region:</b> " + country.region + "</p>")

  makeScrollable(panel)

})
