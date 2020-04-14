import {makeDragable} from "../ui/dragable.mjs"

export function makePanelsDragable() {

  let panels = $(".panel")

  for (let i = 0; i < panels.length; i++) {

    let panel = $("#" + panels[i].id + ".panel")
    makeDragable(panel)

  }

}
