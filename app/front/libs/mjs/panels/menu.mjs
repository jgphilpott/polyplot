import {addPanelEvents} from "./events/all.mjs"

export function addMenuPanel() {

  $("body").append("<div id='menu' class='panel'></div>")

  let panel = $("#menu.panel")

  let main = "<div id='main'>"

  main += "<img class='close' src='/front/imgs/panels/all/close.png'>"

  main += "<div id='head'><a href='/'><img id='logo' src='/front/imgs/theme/logo.png'></a><h1 id='name'>Polyplot</h1></div>"

  main += "<div id='settings' class='option'><h3>Settings</h3></div>"
  main += "<div id='sources' class='option'><h3>Sources</h3></div>"
  main += "<a href='https://github.com/jgphilpott/polyplot/blob/master/docs/api/README.md'><div id='api' class='option'><h3>API</h3></div></a>"

  main += "<div id='signup' class='option opt'><h3>Sign Up</h3></div>"
  main += "<div id='login' class='option opt'><h3>Login</h3></div>"

  main += "</div>"

  panel.append(main)

  let mainWidth = panel.width()
  let mainHeight = panel.height()

  let mainBorder = Number(panel.css("border-width")[0])
  let mainPadding = Number(panel.css("padding")[0])

  let buffer = (mainBorder * 2) + (mainPadding * 2)

  $("#main").width(mainWidth).height(mainHeight)

  panel.append("<div id='settings-panel' class='sub-panel'><p>Settings</p></div>")
  panel.append("<div id='sources-panel' class='sub-panel'><p>Sources</p></div>")

  panel.append("<div id='signup-panel' class='sub-panel'><p>Sign Up</p></div>")
  panel.append("<div id='login-panel' class='sub-panel'><p>Login</p></div>")

  $("#settings").click(function() {
    togglePanel($("#settings-panel"))
  })

  $("#sources").click(function() {
    togglePanel($("#sources-panel"))
  })

  $("#signup").click(function() {
    togglePanel($("#signup-panel"))
  })

  $("#login").click(function() {
    togglePanel($("#login-panel"))
  })

  function togglePanel(panel) {

    if (panel.css("display") == "none") {

      $(".sub-panel").css("display", "none")

      panel.css("display", "block")
      let panelWidth = panel.width() + buffer
      panel.css("display", "none")

      $("#menu.panel").animate({"width": mainWidth + panelWidth}, {"duration": 1000, "queue": false})
      $("#menu.panel").animate({"height": mainHeight + buffer}, {"duration": 1000, "queue": false})

      panel.css("display", "block")

    } else {

      $("#menu.panel").animate({"width": mainWidth + buffer}, {"duration": 1000, "queue": false})
      $("#menu.panel").animate({"height": mainHeight + buffer}, {"duration": 1000, "queue": false})

      panel.css("display", "none")

    }

  }

  addPanelEvents(panel)

}
