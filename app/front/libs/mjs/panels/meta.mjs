import {makeDragable} from "../ui/dragable.mjs"

export function addMetaPanel() {

  let plot = data.plot

  $("body").append("<div id='meta' class='panel'></div>")

  let panel = $("#meta.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='name'>Meta</h1>")

  panel.append("<img id='flag' src='/front/imgs/flags/null.png'>")

  panel.append("<h3 id='region'>None</h3>")

  if (plot.type == "Map") {

    panel.append("<p id='x'><strong id='x-key'>X:</strong> <span id='x-data'>None</span></p>")

  } else if (plot.type == "Poly2") {

    panel.append("<p id='r'><strong id='r-key'>R:</strong> <span id='r-data'>None</span></p>")
    panel.append("<p id='x'><strong id='x-key'>X:</strong> <span id='x-data'>None</span></p>")
    panel.append("<p id='y'><strong id='y-key'>Y:</strong> <span id='y-data'>None</span></p>")

  } else if (plot.type == "Poly3") {

    panel.append("<p id='r'><strong id='r-key'>R:</strong> <span id='r-data'>None</span></p>")
    panel.append("<p id='x'><strong id='x-key'>X:</strong> <span id='x-data'>None</span></p>")
    panel.append("<p id='y'><strong id='y-key'>Y:</strong> <span id='y-data'>None</span></p>")
    panel.append("<p id='z'><strong id='z-key'>Z:</strong> <span id='z-data'>None</span></p>")

  }

  panel.css("top", $("#legend").position().top - 10)

  makeDragable(panel)

}

export function updateMetaPanel(code) {

  let plot = data.plot.plots.find(item => item.code == code)

  let r, x, y, z = null

  if (data.plot.type == "Map") {

    x = plot.x.find(item => item.year == data.plot.t.year).value

  } else if (data.plot.type == "Poly2") {

    r = plot.r.find(item => item.year == data.plot.t.year).value
    x = plot.x.find(item => item.year == data.plot.t.year).value
    y = plot.y.find(item => item.year == data.plot.t.year).value

  } else if (data.plot.type == "Poly3") {

    r = plot.r.find(item => item.year == data.plot.t.year).value
    x = plot.x.find(item => item.year == data.plot.t.year).value
    y = plot.y.find(item => item.year == data.plot.t.year).value
    z = plot.z.find(item => item.year == data.plot.t.year).value

  }

  $("#meta #name").text(plot.name)

  $("#meta #flag").attr("src", "/front/imgs/flags/" + code + ".png")

  $("#meta #region").text(plot.region)

  $("#meta #r-data").text(r)
  $("#meta #x-data").text(x)
  $("#meta #y-data").text(y)
  $("#meta #z-data").text(z)

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
