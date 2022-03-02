import {width, height} from "./window.mjs"
import {addPoltPanel} from "../panels/plot.mjs"
import {updateMetaPanel, clearMetaPanel} from "../panels/meta.mjs"

export function contextMenu(code, domEvent) {

  $("#context-menu.panel").remove()

  let settings = data.client.settings

  let menu = "<div id='context-menu' class='panel'>"

  menu += "<a href='/countries/" + code + "'><p id='view-page'>View Page</p></a>"
  menu += "<p id='open-panel'>Open Panel</p>"

  menu += "</div>"

  $("body").append(menu)

  let offset = 5
  let contextMenu = $("#context-menu")

  contextMenu.css("z-index", settings.panels.zIndex + 1)
  setBackground(contextMenu, settings.general.opacity)

  let contextMenuWidth = contextMenu.outerWidth()
  let contextMenuHeight = contextMenu.outerHeight()

  if (domEvent.pageX >= width() / 2) {
    contextMenu.css("left", domEvent.pageX - contextMenuWidth + offset)
  } else if (domEvent.pageX < width() / 2) {
    contextMenu.css("left", domEvent.pageX - offset)
  }

  if (domEvent.pageY >= height() / 2) {
    contextMenu.css("top", domEvent.pageY - contextMenuHeight + offset)
  } else if (domEvent.pageY < height() / 2) {
    contextMenu.css("top", domEvent.pageY - offset)
  }

  $("#open-panel").click(function() { addPoltPanel(code) })

  contextMenu.mouseover(function() {
    updateMetaPanel(code)
  }).mouseout(function() {
    clearMetaPanel()
  })

}