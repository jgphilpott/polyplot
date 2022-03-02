import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot
let plots = plot.plots

export function addMetaPanel(panelSetting, plotType=plot.type) {

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

  addPanelEvents(panel)

  panel.css("top", $("#legend.panel").position().top - 10)

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}

export function updateMetaPanel(code, plotType=plot.type) {

  let country = plots.find(plot => plot.code == code)

  $("#meta #name").text(country.name)
  $("#meta #flag").attr("src", "/front/imgs/flags/" + country.code + ".png")
  $("#meta #region").text(country.region)

  let year = plot.t.year

  if (plotType == "Map") {

    let x = country.x.find(date => date.year == year).value

    $("#meta #x-data").text(typeof(x) == "number" ? format(x, "oodles") : "None")

  } else if (plotType == "Poly2") {

    let r = country.r.find(date => date.year == year).value
    let x = country.x.find(date => date.year == year).value
    let y = country.y.find(date => date.year == year).value

    $("#meta #r-data").text(typeof(r) == "number" ? format(r, "oodles") : "None")
    $("#meta #x-data").text(typeof(x) == "number" ? format(x, "oodles") : "None")
    $("#meta #y-data").text(typeof(y) == "number" ? format(y, "oodles") : "None")

  } else if (plotType == "Poly3") {

    let r = country.r.find(date => date.year == year).value
    let x = country.x.find(date => date.year == year).value
    let y = country.y.find(date => date.year == year).value
    let z = country.z.find(date => date.year == year).value

    $("#meta #r-data").text(typeof(r) == "number" ? format(r, "oodles") : "None")
    $("#meta #x-data").text(typeof(x) == "number" ? format(x, "oodles") : "None")
    $("#meta #y-data").text(typeof(y) == "number" ? format(y, "oodles") : "None")
    $("#meta #z-data").text(typeof(z) == "number" ? format(z, "oodles") : "None")

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