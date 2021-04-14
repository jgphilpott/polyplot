import {addPanelEvents} from "./events/all.mjs"

export function addErrorPanel() {

  $("body").append("<div id='error' class='panel'></div>")

  let panel = $("#error.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='code'>" + data.code + "</h1>")
  panel.append("<h3 id='message'>" + data.message + "</h3>")

  addPanelEvents(panel)

  panel.width(panel.width()).height(panel.height())

}
