import {rainbow} from "../../../libs/mjs/colors/solid/rainbow.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  $("body").append("<div id='indicators' class='panel'><h1 id='name'>Indicators by Category</h1></div>")

  let panel = $("#indicators.panel")

})
