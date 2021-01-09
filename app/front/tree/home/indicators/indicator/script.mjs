import {rainbow} from "../../../../libs/mjs/colors/solid/rainbow.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  $("body").append("<div id='indicator' class='panel'></div>")

  let panel = $("#indicator.panel")

})
