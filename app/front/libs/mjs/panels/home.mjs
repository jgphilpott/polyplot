import {addPanelEvents} from "./events/all.mjs"

export function addHomePanel() {

  $("body").append("<div id='home' class='panel'></div>")

  let panel = $("#home.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<img id='logo' src='/front/imgs/theme/logo.png'>")
  panel.append("<h1 id='title'>Polyplot</h1>")
  panel.append("<p id='description'>A data exploration application inspired by <a href='https://github.com/olarosling'>Ola Rosling</a>'s <a href='https://en.wikipedia.org/wiki/Trendalyzer'>Trendalyzer</a> software.</p>")
  panel.append("<iframe id='video' src='https://www.youtube.com/embed/placeholder' allowfullscreen></iframe>")

  addPanelEvents(panel)

}
