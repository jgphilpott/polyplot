import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot
let plots = plot.plots
let plotType = plot.type

export function addMetaPanel() {

  $("body").append("<div id='meta' class='panel'></div>")

  let panel = $("#meta.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='name'>Meta</h1>")

  panel.append("<img id='flag' src='/front/imgs/flags/null.png'>")

  panel.append("<h3 id='region'>None</h3>")

  if (plotType == "Map") {

    panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>None</span></p>")

  } else if (plotType == "Poly2") {

    panel.append("<p id='" + plot.r.code + "'><strong id='r-key'>R:</strong> <span id='r-data'>None</span></p>")
    panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>None</span></p>")
    panel.append("<p id='" + plot.y.code + "'><strong id='y-key'>Y:</strong> <span id='y-data'>None</span></p>")

  } else if (plotType == "Poly3") {

    panel.append("<p id='" + plot.r.code + "'><strong id='r-key'>R:</strong> <span id='r-data'>None</span></p>")
    panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>None</span></p>")
    panel.append("<p id='" + plot.y.code + "'><strong id='y-key'>Y:</strong> <span id='y-data'>None</span></p>")
    panel.append("<p id='" + plot.z.code + "'><strong id='z-key'>Z:</strong> <span id='z-data'>None</span></p>")

  }

  panel.css("top", $("#legend.panel").position().top - 10)

  addPanelEvents(panel)

}

export function updateMetaPanel(code) {

  let plot = plots.find(plot => plot.code == code)

  $("#meta #name").text(plot.name)

  $("#meta #flag").attr("src", "/front/imgs/flags/" + code + ".png")

  $("#meta #region").text(plot.region)

  let r, x, y, z = null
  let year = data.plot.t.year

  if (plotType == "Map") {

    x = plot.x.find(date => date.year == year).value

    $("#meta #x-data").text(format(x))

  } else if (plotType == "Poly2") {

    r = plot.r.find(date => date.year == year).value
    x = plot.x.find(date => date.year == year).value
    y = plot.y.find(date => date.year == year).value

    $("#meta #r-data").text(format(r))
    $("#meta #x-data").text(format(x))
    $("#meta #y-data").text(format(y))

  } else if (plotType == "Poly3") {

    r = plot.r.find(date => date.year == year).value
    x = plot.x.find(date => date.year == year).value
    y = plot.y.find(date => date.year == year).value
    z = plot.z.find(date => date.year == year).value

    $("#meta #r-data").text(format(r))
    $("#meta #x-data").text(format(x))
    $("#meta #y-data").text(format(y))
    $("#meta #z-data").text(format(z))

  }

}

export function clearMetaPanel() {

  $("#meta #name").text("Meta")

  $("#meta #flag").attr("src", "/front/imgs/flags/null.png")

  $("#meta #region").text("None")

  $("#meta #r-data").text("None")
  $("#meta #x-data").text("None")
  $("#meta #y-data").text("None")
  $("#meta #z-data").text("None")

}
