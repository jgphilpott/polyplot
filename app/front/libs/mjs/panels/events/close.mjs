import {updateSettings} from "../menu.mjs"

export function makeClosable(panel) {

  let id = panel.attr("id")
  let close = $("#" + id + " .close")

  close.click(function(event) {

    if (panel.hasClass("plot")) {
      panel.remove()
    } else {
      updateSettings("panels", id, false)
    }

  })

}