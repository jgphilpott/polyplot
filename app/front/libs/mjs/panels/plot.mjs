import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot
let plots = plot.plots
let plotType = plot.type

export function addPoltPanel(code) {

  let country = plots.find(plot => plot.code == code)

  $("body").append("<div id='" + country.code + "' class='plot panel'></div>")

  let panel = $("#" + country.code + ".panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='name'>" + country.name + "</h1>")

  panel.append("<img id='flag' src='/front/imgs/flags/" + country.code + ".png'>")

  panel.append("<h3 id='region'>" + country.region + "</h3>")

  let year = data.plot.t.year

  if (plotType == "Map") {

    let x = country.x.find(date => date.year == year).value

    panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + x.toFixed(2) + "</span></p>")

  } else if (plotType == "Poly2") {

    let r = country.r.find(date => date.year == year).value
    let x = country.x.find(date => date.year == year).value
    let y = country.y.find(date => date.year == year).value

    panel.append("<p id='" + plot.r.code + "'><strong id='r-key'>R:</strong> <span id='r-data'>" + r.toFixed(2) + "</span></p>")
    panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + x.toFixed(2) + "</span></p>")
    panel.append("<p id='" + plot.y.code + "'><strong id='y-key'>Y:</strong> <span id='y-data'>" + y.toFixed(2) + "</span></p>")

  } else if (plotType == "Poly3") {

    let r = country.r.find(date => date.year == year).value
    let x = country.x.find(date => date.year == year).value
    let y = country.y.find(date => date.year == year).value
    let z = country.z.find(date => date.year == year).value

    panel.append("<p id='" + plot.r.code + "'><strong id='r-key'>R:</strong> <span id='r-data'>" + r.toFixed(2) + "</span></p>")
    panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + x.toFixed(2) + "</span></p>")
    panel.append("<p id='" + plot.y.code + "'><strong id='y-key'>Y:</strong> <span id='y-data'>" + y.toFixed(2) + "</span></p>")
    panel.append("<p id='" + plot.z.code + "'><strong id='z-key'>Z:</strong> <span id='z-data'>" + z.toFixed(2) + "</span></p>")

  }

  addPanelEvents(panel)

}
