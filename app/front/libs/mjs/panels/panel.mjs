import {xEvents} from "../core/events.mjs"

import {addErrorPanel} from "./error.mjs"
import {addHomePanel} from "./home.mjs"
import {addLegendPanel} from "./legend.mjs"
import {addMapPanel} from "./map.mjs"
import {addMetaPanel} from "./meta.mjs"
import {addSettingsPanel} from "./settings.mjs"
import {addTimePanel} from "./time.mjs"

export function addPanels() {

  data.plot.core.dom = xEvents()

  addErrorPanel()
  addHomePanel()
  addLegendPanel()
  addMapPanel()
  addMetaPanel()
  addSettingsPanel()
  addTimePanel()

  let panels = $(".panel")

  function makeDragable(panel) {

    panel = $(".panel#" + panel.id)

    let width = panel.width()
    let height = panel.height()

    let xOffset = 0, yOffset = 0

    function start(event) {

      event.preventDefault()
      event.stopPropagation()

      if (panel.css("transform") != "none") {

        let translation = panel.css("transform").replace(/[{()}]/g, "").replace(/[a-zA-Z]/g, "").split(",")

        xOffset = event.clientX - panel.position().left + Number(translation[4])
        yOffset = event.clientY - panel.position().top + Number(translation[5])

      } else {

        xOffset = event.clientX - panel.position().left
        yOffset = event.clientY - panel.position().top

      }

      document.onmousemove = drag
      document.onmouseup = stop

    }

    function drag(event) {

      event.preventDefault()
      event.stopPropagation()

      panel.width(width)
      panel.height(height)

      panel.css({top: event.clientY - yOffset, left: event.clientX - xOffset})

    }

    function stop(event) {

      event.preventDefault()
      event.stopPropagation()

      document.onmouseup = null
      document.onmousemove = null

    }

    panel.mousedown(start)

  }

  for (let i = 0; i < panels.length; i++) {

    makeDragable(panels[i])

  }

}
