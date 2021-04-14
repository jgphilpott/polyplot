import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot
let plots = plot.plots

export function addPoltPanel(code, plotType=plot.type) {

  if (!$("#" + code + ".panel").length) {

    let country = plots.find(plot => plot.code == code)

    $("body").append("<div id='" + country.code + "' class='plot panel'></div>")

    let panel = $("#" + country.code + ".panel")

    panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

    panel.append("<a href='/countries/" + country.code + "'><h1 id='name'>" + country.name + "</h1></a>")
    panel.append("<img id='flag' src='/front/imgs/flags/" + country.code + ".png'>")
    panel.append("<h3 id='region'>" + country.region + "</h3>")

    let year = plot.t.year

    if (plotType == "Map") {

      let x = country.x.find(date => date.year == year).value

      panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + format(x, "oodles") + "</span></p>")

    } else if (plotType == "Poly2") {

      let r = country.r.find(date => date.year == year).value
      let x = country.x.find(date => date.year == year).value
      let y = country.y.find(date => date.year == year).value

      panel.append("<p id='" + plot.r.code + "'><strong id='r-key'>R:</strong> <span id='r-data'>" + format(r, "oodles") + "</span></p>")
      panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + format(x, "oodles") + "</span></p>")
      panel.append("<p id='" + plot.y.code + "'><strong id='y-key'>Y:</strong> <span id='y-data'>" + format(y, "oodles") + "</span></p>")

    } else if (plotType == "Poly3") {

      let r = country.r.find(date => date.year == year).value
      let x = country.x.find(date => date.year == year).value
      let y = country.y.find(date => date.year == year).value
      let z = country.z.find(date => date.year == year).value

      panel.append("<p id='" + plot.r.code + "'><strong id='r-key'>R:</strong> <span id='r-data'>" + format(r, "oodles") + "</span></p>")
      panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + format(x, "oodles") + "</span></p>")
      panel.append("<p id='" + plot.y.code + "'><strong id='y-key'>Y:</strong> <span id='y-data'>" + format(y, "oodles") + "</span></p>")
      panel.append("<p id='" + plot.z.code + "'><strong id='z-key'>Z:</strong> <span id='z-data'>" + format(z, "oodles") + "</span></p>")

    }

    addPanelEvents(panel)

  }

}

export function updatePoltPanel(code, plotType=plot.type) {

  // let point = plots.find(plot => plot.code == code)
  //
  // $("#" + code + ".panel #name").text(point.name)
  //
  // $("#" + code + ".panel #flag").attr("src", "/front/imgs/flags/" + code + ".png")
  //
  // $("#" + code + ".panel #region").text(point.region)
  //
  // let year = plot.t.year
  //
  // if (plotType == "Map") {
  //
  //   let x = point.x.find(date => date.year == year).value
  //
  //   $("#" + code + ".panel #x-data").text(format(x))
  //
  // } else if (plotType == "Poly2") {
  //
  //   let r = point.r.find(date => date.year == year).value
  //   let x = point.x.find(date => date.year == year).value
  //   let y = point.y.find(date => date.year == year).value
  //
  //   $("#" + code + ".panel #r-data").text(format(r))
  //   $("#" + code + ".panel #x-data").text(format(x))
  //   $("#" + code + ".panel #y-data").text(format(y))
  //
  // } else if (plotType == "Poly3") {
  //
  //   let r = point.r.find(date => date.year == year).value
  //   let x = point.x.find(date => date.year == year).value
  //   let y = point.y.find(date => date.year == year).value
  //   let z = point.z.find(date => date.year == year).value
  //
  //   $("#" + code + ".panel #r-data").text(format(r))
  //   $("#" + code + ".panel #x-data").text(format(x))
  //   $("#" + code + ".panel #y-data").text(format(y))
  //   $("#" + code + ".panel #z-data").text(format(z))
  //
  // }

}
