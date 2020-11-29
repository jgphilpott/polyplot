import {updateMetaPanel} from "../../panels/meta.mjs"
import {updatePoltPanel} from "../../panels/plot.mjs"

export function animatePanels() {

  let meta = $("#meta #flag").attr("src").split("/").pop().split(".")[0]

  if (meta != "null") { updateMetaPanel(meta) }

  let plotPanels = $(".plot.panel")

  for (let i = 0; i < plotPanels.length; i++) {

    updatePoltPanel(plotPanels[i].id)

  }

}
