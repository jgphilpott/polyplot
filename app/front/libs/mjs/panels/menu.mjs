import {makeDragable} from "../ui/dragable.mjs"

export function addMenuPanel() {

  $("body").append("<div id='menu' class='panel'></div>")

  let panel = $("#menu.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<div id='head'><img id='logo' src='/front/imgs/theme/logo.png'><h1 id='title'>Polyplot</h1></div>")

  panel.append("<div class='option'><h3 id='settings'>Settings</h3></div>")
  panel.append("<div class='option'><h3 id='sources'>Sources</h3></div>")
  panel.append("<div class='option'><h3 id='api'>API</h3></div>")
  panel.append("<div class='option opt'><h3 id='signup'>Sign Up</h3></div>")
  panel.append("<div class='option opt'><h3 id='login'>Login</h3></div>")

  makeDragable(panel)

}
