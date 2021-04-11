import {updateSettings} from "./menu.mjs"
import {addPanelEvents} from "./events/all.mjs"

let plot = data.plot

export function addLegendPanel(panelSetting) {

  $("body").append("<div id='legend' class='panel'></div>")

  let panel = $("#legend.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<div class='head'><img id='search' class='button' src='/front/imgs/panels/legend/search.png'><h1 id='name'>Legend</h1></div>")

  if (plot.type == "Map") {

    $("#legend.panel .head > img:nth-child(1)").after("<img id='layers' class='button' src='/front/imgs/panels/legend/layers.png'>")

    panel.append("<div id='x-axis' class='axis-box'><p id='" + plot.x.code + "'><b id='x-key'>X:</b> <a href='/indicators/" + plot.x.code + "'><span id='x-data'>" + plot.x.name + "</span></a></p></div>")

    for (let i = 0; i < plot.x.categories.length; i++) { $("#x-axis").append("<img class='category-icon' src='/front/imgs/panels/indicators/categories/" + camalize(plot.x.categories[i]) + ".png'>") }

  } else if (plot.type == "Poly2") {

    panel.append("<div id='r-axis' class='axis-box'><p id='" + plot.r.code + "'><b id='r-key'>R:</b> <a href='/indicators/" + plot.r.code + "'><span id='r-data'>" + plot.r.name + "</span></a></p></div>")
    panel.append("<div id='x-axis' class='axis-box'><p id='" + plot.x.code + "'><b id='x-key'>X:</b> <a href='/indicators/" + plot.x.code + "'><span id='x-data'>" + plot.x.name + "</span></a></p></div>")
    panel.append("<div id='y-axis' class='axis-box'><p id='" + plot.y.code + "'><b id='y-key'>Y:</b> <a href='/indicators/" + plot.y.code + "'><span id='y-data'>" + plot.y.name + "</span></a></p></div>")

    for (let i = 0; i < plot.r.categories.length; i++) { $("#r-axis").append("<img class='category-icon' src='/front/imgs/panels/indicators/categories/" + camalize(plot.r.categories[i]) + ".png'>") }
    for (let i = 0; i < plot.x.categories.length; i++) { $("#x-axis").append("<img class='category-icon' src='/front/imgs/panels/indicators/categories/" + camalize(plot.x.categories[i]) + ".png'>") }
    for (let i = 0; i < plot.y.categories.length; i++) { $("#y-axis").append("<img class='category-icon' src='/front/imgs/panels/indicators/categories/" + camalize(plot.y.categories[i]) + ".png'>") }

  } else if (plot.type == "Poly3") {

    panel.append("<div id='r-axis' class='axis-box'><p id='" + plot.r.code + "'><b id='r-key'>R:</b> <a href='/indicators/" + plot.r.code + "'><span id='r-data'>" + plot.r.name + "</span></a></p></div>")
    panel.append("<div id='x-axis' class='axis-box'><p id='" + plot.x.code + "'><b id='x-key'>X:</b> <a href='/indicators/" + plot.x.code + "'><span id='x-data'>" + plot.x.name + "</span></a></p></div>")
    panel.append("<div id='y-axis' class='axis-box'><p id='" + plot.y.code + "'><b id='y-key'>Y:</b> <a href='/indicators/" + plot.y.code + "'><span id='y-data'>" + plot.y.name + "</span></a></p></div>")
    panel.append("<div id='z-axis' class='axis-box'><p id='" + plot.z.code + "'><b id='z-key'>Z:</b> <a href='/indicators/" + plot.z.code + "'><span id='z-data'>" + plot.z.name + "</span></a></p></div>")

    for (let i = 0; i < plot.r.categories.length; i++) { $("#r-axis").append("<img class='category-icon' src='/front/imgs/panels/indicators/categories/" + camalize(plot.r.categories[i]) + ".png'>") }
    for (let i = 0; i < plot.x.categories.length; i++) { $("#x-axis").append("<img class='category-icon' src='/front/imgs/panels/indicators/categories/" + camalize(plot.x.categories[i]) + ".png'>") }
    for (let i = 0; i < plot.y.categories.length; i++) { $("#y-axis").append("<img class='category-icon' src='/front/imgs/panels/indicators/categories/" + camalize(plot.y.categories[i]) + ".png'>") }
    for (let i = 0; i < plot.z.categories.length; i++) { $("#z-axis").append("<img class='category-icon' src='/front/imgs/panels/indicators/categories/" + camalize(plot.z.categories[i]) + ".png'>") }

  }

  $("#search.button").click(function(event) {
    ($("#indicators.panel").css("visibility") == "visible") ? (updateSettings("panels", "indicators", false)) : (updateSettings("panels", "indicators", true))
  })

  $("#layers.button").click(function(event) {
    ($("#layers.panel").css("visibility") == "visible") ? (updateSettings("panels", "layers", false)) : (updateSettings("panels", "layers", true))
  })

  panel.width(panel.width()).height(panel.height())

  addPanelEvents(panel)

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}
