import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot
let plots = plot.plots

export function addPoltPanel(code, plotType=plot.type) {

  if (!$("#" + code + ".panel").length) {

    let country = plots.find(plot => plot.code == code)

    $("body").append("<div id='" + country.code + "' class='plot panel'></div>")

    let panel = $("#" + country.code + ".panel")

    panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

    panel.append("<h1 id='name'><a href='/countries/" + country.code + "'>" + country.name + "</a></h1>")
    panel.append("<img id='flag' src='/front/imgs/flags/" + country.code + ".png'>")
    panel.append("<h3 id='region'>" + country.region + "</h3>")

    let year = plot.t.year

    if (plotType == "Map") {

      let x = country.x.find(date => date.year == year).value

      panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + (typeof(x) == "number" ? format(x, "oodles") : "None") + "</span></p>")

    } else if (plotType == "Poly2") {

      let r = country.r.find(date => date.year == year).value
      let x = country.x.find(date => date.year == year).value
      let y = country.y.find(date => date.year == year).value

      panel.append("<p id='" + plot.r.code + "'><strong id='r-key'>R:</strong> <span id='r-data'>" + (typeof(r) == "number" ? format(r, "oodles") : "None") + "</span></p>")
      panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + (typeof(x) == "number" ? format(x, "oodles") : "None") + "</span></p>")
      panel.append("<p id='" + plot.y.code + "'><strong id='y-key'>Y:</strong> <span id='y-data'>" + (typeof(y) == "number" ? format(y, "oodles") : "None") + "</span></p>")

    } else if (plotType == "Poly3") {

      let r = country.r.find(date => date.year == year).value
      let x = country.x.find(date => date.year == year).value
      let y = country.y.find(date => date.year == year).value
      let z = country.z.find(date => date.year == year).value

      panel.append("<p id='" + plot.r.code + "'><strong id='r-key'>R:</strong> <span id='r-data'>" + (typeof(r) == "number" ? format(r, "oodles") : "None") + "</span></p>")
      panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + (typeof(x) == "number" ? format(x, "oodles") : "None") + "</span></p>")
      panel.append("<p id='" + plot.y.code + "'><strong id='y-key'>Y:</strong> <span id='y-data'>" + (typeof(y) == "number" ? format(y, "oodles") : "None") + "</span></p>")
      panel.append("<p id='" + plot.z.code + "'><strong id='z-key'>Z:</strong> <span id='z-data'>" + (typeof(z) == "number" ? format(z, "oodles") : "None") + "</span></p>")

    }

    addPanelEvents(panel)

  }

}

export function updatePoltPanel(code, plotType=plot.type) {

  let country = plots.find(plot => plot.code == code)

  $("#" + code + ".panel #name").text(country.name)
  $("#" + code + ".panel #flag").attr("src", "/front/imgs/flags/" + country.code + ".png")
  $("#" + code + ".panel #region").text(country.region)

  let year = plot.t.year

  if (plotType == "Map") {

    let x = country.x.find(date => date.year == year).value

    $("#" + code + ".panel #x-data").text(typeof(x) == "number" ? format(x, "oodles") : "None")

  } else if (plotType == "Poly2") {

    let r = country.r.find(date => date.year == year).value
    let x = country.x.find(date => date.year == year).value
    let y = country.y.find(date => date.year == year).value

    $("#" + code + ".panel #r-data").text(typeof(r) == "number" ? format(r, "oodles") : "None")
    $("#" + code + ".panel #x-data").text(typeof(x) == "number" ? format(x, "oodles") : "None")
    $("#" + code + ".panel #y-data").text(typeof(y) == "number" ? format(y, "oodles") : "None")

  } else if (plotType == "Poly3") {

    let r = country.r.find(date => date.year == year).value
    let x = country.x.find(date => date.year == year).value
    let y = country.y.find(date => date.year == year).value
    let z = country.z.find(date => date.year == year).value

    $("#" + code + ".panel #r-data").text(typeof(r) == "number" ? format(r, "oodles") : "None")
    $("#" + code + ".panel #x-data").text(typeof(x) == "number" ? format(x, "oodles") : "None")
    $("#" + code + ".panel #y-data").text(typeof(y) == "number" ? format(y, "oodles") : "None")
    $("#" + code + ".panel #z-data").text(typeof(z) == "number" ? format(z, "oodles") : "None")

  }

}