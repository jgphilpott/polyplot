import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot
let plotType = plot.type

export function addIndicatorsPanel() {

  $("body").append("<div id='indicators' class='panel'></div>")

  let panel = $("#indicators.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  let head = "<div class='head'><h1 id='title'>Indicators by Category</h1>"

  if (plotType == "Map") {

    head += "<div id='x-box' class='axis-box'><h3 id='x-key'>X</h3></div>"

  } else if (plotType == "Poly2") {

    head += "<div id='r-box' class='axis-box'><h3 id='r-key'>R</h3></div>"
    head += "<div id='x-box' class='axis-box'><h3 id='x-key'>X</h3></div>"
    head += "<div id='y-box' class='axis-box'><h3 id='y-key'>Y</h3></div>"

  } else if (plotType == "Poly3") {

    head += "<div id='r-box' class='axis-box'><h3 id='r-key'>R</h3></div>"
    head += "<div id='x-box' class='axis-box'><h3 id='x-key'>X</h3></div>"
    head += "<div id='y-box' class='axis-box'><h3 id='y-key'>Y</h3></div>"
    head += "<div id='z-box' class='axis-box'><h3 id='z-key'>Z</h3></div>"

  }

  head += "</div>"

  panel.append(head)

  socket.emit("get_indicators")

  socket.on("new_indicators", function(indicators) {

    socket.emit("get_meta", "categories")

    socket.on("new_meta", function(categories) {

      console.log(indicators)
      console.log(categories)

    })

  })

  socket.on("new_indicator", function(indicator) {

    console.log(indicator)

  })

  addPanelEvents(panel)

}
