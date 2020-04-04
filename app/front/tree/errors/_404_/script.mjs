import {rainbow} from "../../../libs/mjs/colors/solid/rainbow.mjs"

import {addErrorPanel} from "../../../libs/mjs/panels/error.mjs"
import {makePanelsDragable} from "../../../libs/mjs/panels/all.mjs"

$(document).ready(function() {

  summonParticleWeb(42, rainbow)
  
  addErrorPanel()
  makePanelsDragable()

})
