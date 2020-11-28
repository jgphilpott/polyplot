import {width, height} from "./window.mjs"
import {addPoltPanel} from "../panels/plot.mjs"
import {updateMetaPanel, clearMetaPanel} from "../panels/meta.mjs"

export function contextMenu(code, domEvent) {

  $("#contextMenu").remove()

  let menu = "<div id='contextMenu' class='panel'>"

  menu += "<a href='/countries/" + code + "'><p id='viewPage'>View Page</p></a>"
  menu += "<p id='openPanel'>Open Panel</p>"

  menu += "</div>"

  $("body").append(menu)

  $("#openPanel").click(function() {

    addPoltPanel(code)

  })

  let contextMenu = $("#contextMenu")
  let contextMenuIndex = 5

  let contextMenuWidth = contextMenu.outerWidth()
  let contextMenuHeight = contextMenu.outerHeight()

  contextMenu.css("z-index", contextMenuIndex)

  if (domEvent.pageX >= width() / 2) {
    contextMenu.css("left", domEvent.pageX - contextMenuWidth + contextMenuIndex)
  } else if (domEvent.pageX < width() / 2) {
    contextMenu.css("left", domEvent.pageX - contextMenuIndex)
  }

  if (domEvent.pageY >= height() / 2) {
    contextMenu.css("top", domEvent.pageY - contextMenuHeight + contextMenuIndex)
  } else if (domEvent.pageY < height() / 2) {
    contextMenu.css("top", domEvent.pageY - contextMenuIndex)
  }

  contextMenu.mouseover(function() {

    updateMetaPanel(code)

  }).mouseout(function() {

    clearMetaPanel()

  })

}
