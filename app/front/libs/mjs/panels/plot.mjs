import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot
let plots = plot.plots
let plotType = plot.type

export function addPoltPanel(code) {

  $("body").append("<div id='plot' class='panel'></div>")

  let panel = $("#plot.panel")

  panel.append("<h1>" + code + "</h1>")

  addPanelEvents(panel)

}
