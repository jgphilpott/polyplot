import {toggleCheckbox} from "../menu.mjs"

export function makeClosable(panel) {

  let id = panel.attr("id")
  let close = $("#" + id + " .close")

  close.click(function(event) {

    if (panel.hasClass("plot")) {

      panel.remove()

    } else if (Object.keys(localRead("settings").panels).includes(id)) {

      toggleCheckbox("panels", id, event)

    } else {

      panel.css({"visibility": "hidden"})

    }

  })

}
