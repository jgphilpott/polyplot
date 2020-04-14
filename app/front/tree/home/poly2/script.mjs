import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"

import {addTitlePanel} from "../../../libs/mjs/panels/title.mjs"
import {addTimePanel} from "../../../libs/mjs/panels/time.mjs"
import {makePanelsDragable} from "../../../libs/mjs/panels/all.mjs"

$(document).ready(function() {

  scaleAxes()

  addTitlePanel()
  addTimePanel()
  makePanelsDragable()

  console.log(data)

})
