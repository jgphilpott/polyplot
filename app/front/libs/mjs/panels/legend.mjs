import {makeDragable} from "../ui/dragable.mjs"
import {addPanelEvents} from "../ui/events.mjs"

export function addLegendPanel() {

  let plot = data.plot

  $("body").append("<div id='legend' class='panel'></div>")

  let panel = $("#legend.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<div id='head'><img id='search' src='/front/imgs/panels/legend/search.png'><h1 id='name'>Legend</h1></div>")

  if (plot.type == "Map") {

    panel.append("<p id='x'><strong id='x-key'>X:</strong> <span id='x-data'>" + plot.x.name + "</span></p>")

  } else if (plot.type == "Poly2") {

    panel.append("<p id='r'><strong id='r-key'>R:</strong> <span id='r-data'>" + plot.r.name + "</span></p>")
    panel.append("<p id='x'><strong id='x-key'>X:</strong> <span id='x-data'>" + plot.x.name + "</span></p>")
    panel.append("<p id='y'><strong id='y-key'>Y:</strong> <span id='y-data'>" + plot.y.name + "</span></p>")

  } else if (plot.type == "Poly3") {

    panel.append("<p id='r'><strong id='r-key'>R:</strong> <span id='r-data'>" + plot.r.name + "</span></p>")
    panel.append("<p id='x'><strong id='x-key'>X:</strong> <span id='x-data'>" + plot.x.name + "</span></p>")
    panel.append("<p id='y'><strong id='y-key'>Y:</strong> <span id='y-data'>" + plot.y.name + "</span></p>")
    panel.append("<p id='z'><strong id='z-key'>Z:</strong> <span id='z-data'>" + plot.z.name + "</span></p>")

  }

  $("#search").click(function() {

    let indicators = $("#indicators.panel")

    if (indicators.css("visibility") == "hidden") {

      indicators.css("visibility", "visible")

    } else {

      indicators.css("visibility", "hidden")

    }

  })

  makeDragable(panel)
  addPanelEvents(panel)

}
