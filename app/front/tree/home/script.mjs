import {rainbow} from "../../libs/mjs/colors/solid/rainbow.mjs"

import {addHomePanel} from "../../libs/mjs/panels/home.mjs"
import {makePanelsDragable} from "../../libs/mjs/panels/all.mjs"

$(document).ready(function() {

  summonParticleWeb(42, rainbow)

  addHomePanel()
  makePanelsDragable()

})
