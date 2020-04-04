import {makeDragable} from "../ui/dragable.mjs"

export function makePanelsDragable() {

  let panels = $(".panel")

  for (let i = 0; i < panels.length; i++) {

    let panel = $(".panel#" + panels[i].id)
    makeDragable(panel)

  }

}
