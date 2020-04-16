import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"
import {addAllPanels} from "../../../libs/mjs/panels/all.mjs"

$(document).ready(function() {

  $("body").append("<svg id='canvas'></svg>")

  scaleAxes()

  addAllPanels()

  console.log(data)

})
