import {toggleCheckbox} from "./menu.mjs"
import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot

export function addLegendPanel(panelSetting) {

  $("body").append("<div id='legend' class='panel'></div>")

  let panel = $("#legend.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<div id='head'><img id='search' src='/front/imgs/panels/legend/search.png'><h1 id='name'>Legend</h1></div>")

  if (plot.type == "Map") {

    panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + plot.x.name + "</span></p>")

  } else if (plot.type == "Poly2") {

    panel.append("<p id='" + plot.r.code + "'><strong id='r-key'>R:</strong> <span id='r-data'>" + plot.r.name + "</span></p>")
    panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + plot.x.name + "</span></p>")
    panel.append("<p id='" + plot.y.code + "'><strong id='y-key'>Y:</strong> <span id='y-data'>" + plot.y.name + "</span></p>")

  } else if (plot.type == "Poly3") {

    panel.append("<p id='" + plot.r.code + "'><strong id='r-key'>R:</strong> <span id='r-data'>" + plot.r.name + "</span></p>")
    panel.append("<p id='" + plot.x.code + "'><strong id='x-key'>X:</strong> <span id='x-data'>" + plot.x.name + "</span></p>")
    panel.append("<p id='" + plot.y.code + "'><strong id='y-key'>Y:</strong> <span id='y-data'>" + plot.y.name + "</span></p>")
    panel.append("<p id='" + plot.z.code + "'><strong id='z-key'>Z:</strong> <span id='z-data'>" + plot.z.name + "</span></p>")

  }

  $("#search").click(function(event) {

    toggleCheckbox("panels", "indicators", event)

  })

  addPanelEvents(panel)

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}
