import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"

import {addTitlePanel} from "../../../libs/mjs/panels/title.mjs"
import {makePanelsDragable} from "../../../libs/mjs/panels/all.mjs"

$(document).ready(function() {

  scaleAxes()

  addTitlePanel()
  makePanelsDragable()

  console.log(data)

})
