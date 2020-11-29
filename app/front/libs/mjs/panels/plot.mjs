import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot
let plots = plot.plots
let plotType = plot.type

export function addPoltPanel(code) {

  if (!$("#" + code + ".panel").length) {

    let point = plots.find(plot => plot.code == code)

    $("body").append("<div id='" + point.code + "' class='plot panel'></div>")

    let panel = $("#" + point.code + ".panel")

    panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

    panel.append("<h1 id='name'>" + point.name + "</h1>")

    panel.append("<img id='flag' src='/front/imgs/flags/" + point.code + ".png'>")

    panel.append("<h3 id='region'>" + point.region + "</h3>")

    let year = plot.t.year

    if (plotType == "Map") {

      let x = point.x.find(date => date.year == year).value

      panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + format(x) + "</span></p>")

    } else if (plotType == "Poly2") {

      let r = point.r.find(date => date.year == year).value
      let x = point.x.find(date => date.year == year).value
      let y = point.y.find(date => date.year == year).value

      panel.append("<p id='" + plot.r.code + "'><strong id='r-key'>R:</strong> <span id='r-data'>" + format(r) + "</span></p>")
      panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + format(x) + "</span></p>")
      panel.append("<p id='" + plot.y.code + "'><strong id='y-key'>Y:</strong> <span id='y-data'>" + format(y) + "</span></p>")

    } else if (plotType == "Poly3") {

      let r = point.r.find(date => date.year == year).value
      let x = point.x.find(date => date.year == year).value
      let y = point.y.find(date => date.year == year).value
      let z = point.z.find(date => date.year == year).value

      panel.append("<p id='" + plot.r.code + "'><strong id='r-key'>R:</strong> <span id='r-data'>" + format(r) + "</span></p>")
      panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + format(x) + "</span></p>")
      panel.append("<p id='" + plot.y.code + "'><strong id='y-key'>Y:</strong> <span id='y-data'>" + format(y) + "</span></p>")
      panel.append("<p id='" + plot.z.code + "'><strong id='z-key'>Z:</strong> <span id='z-data'>" + format(z) + "</span></p>")

    }

    addPanelEvents(panel)

  }

}

export function updatePoltPanel(code) {

  let point = plots.find(plot => plot.code == code)

  $("#" + code + ".panel #name").text(point.name)

  $("#" + code + ".panel #flag").attr("src", "/front/imgs/flags/" + code + ".png")

  $("#" + code + ".panel #region").text(point.region)

  let year = plot.t.year

  if (plotType == "Map") {

    let x = point.x.find(date => date.year == year).value

    $("#" + code + ".panel #x-data").text(format(x))

  } else if (plotType == "Poly2") {

    let r = point.r.find(date => date.year == year).value
    let x = point.x.find(date => date.year == year).value
    let y = point.y.find(date => date.year == year).value

    $("#" + code + ".panel #r-data").text(format(r))
    $("#" + code + ".panel #x-data").text(format(x))
    $("#" + code + ".panel #y-data").text(format(y))

  } else if (plotType == "Poly3") {

    let r = point.r.find(date => date.year == year).value
    let x = point.x.find(date => date.year == year).value
    let y = point.y.find(date => date.year == year).value
    let z = point.z.find(date => date.year == year).value

    $("#" + code + ".panel #r-data").text(format(r))
    $("#" + code + ".panel #x-data").text(format(x))
    $("#" + code + ".panel #y-data").text(format(y))
    $("#" + code + ".panel #z-data").text(format(z))

  }

}
