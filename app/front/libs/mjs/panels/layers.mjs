import {updateSettings} from "./menu.mjs"
import {addPanelEvents} from "./events/all.mjs"

export function addLayersPanel(panelSetting) {

  $("body").append("<div id='layers' class='panel'></div>")

  let panel = $("#layers.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='name'>Layers</h1>")

  panel.append("<div id='cultural' class='layers-category'><h3>Cultural</h3></div>")
  panel.append("<div id='infrastructure' class='layers-category'><h3>Infrastructure</h3></div>")
  panel.append("<div id='natural' class='layers-category'><h3>Natural</h3></div>")

  let culturalCategory = $("#cultural.layers-category")
  let infrastructureCategory = $("#infrastructure.layers-category")
  let naturalCategory = $("#natural.layers-category")

  culturalCategory.append("<div class='setting'><input id='cities' class='checkbox' type='checkbox'><label>Cities Layer</label></div>")

  infrastructureCategory.append("<div class='setting'><input id='airports' class='checkbox' type='checkbox'><label>Airports Layer</label></div>")
  infrastructureCategory.append("<div class='setting'><input id='ports' class='checkbox' type='checkbox'><label>Ports Layer</label></div>")
  infrastructureCategory.append("<div class='setting'><input id='railroads' class='checkbox' type='checkbox'><label>Railroads Layer</label></div>")
  infrastructureCategory.append("<div class='setting'><input id='roads' class='checkbox' type='checkbox'><label>Roads Layer</label></div>")

  naturalCategory.append("<div class='setting'><input id='graticules' class='checkbox' type='checkbox'><label>Graticules Layer</label></div>")
  naturalCategory.append("<div class='setting'><input id='lakes' class='checkbox' type='checkbox'><label>Lakes Layer</label></div>")
  naturalCategory.append("<div class='setting'><input id='rivers' class='checkbox' type='checkbox'><label>Rivers Layer</label></div>")

  let mapSettings = localRead("settings").map

  $(".setting #cities").prop("checked", mapSettings.cities)

  $(".setting #airports").prop("checked", mapSettings.airports)
  $(".setting #ports").prop("checked", mapSettings.ports)
  $(".setting #railroads").prop("checked", mapSettings.railroads)
  $(".setting #roads").prop("checked", mapSettings.roads)

  $(".setting #graticules").prop("checked", mapSettings.graticules)
  $(".setting #lakes").prop("checked", mapSettings.lakes)
  $(".setting #rivers").prop("checked", mapSettings.rivers)

  $("#layers.panel .checkbox").click(function(event) {
    updateSettings("map", this.id, $(this).is(":checked"))
  })

  addPanelEvents(panel)

  panel.width(panel.width()).height(panel.height())

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}
