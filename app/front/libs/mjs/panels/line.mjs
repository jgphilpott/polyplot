import {drawAxes} from "../draw/axes.mjs"
import {scaleLine} from "../scales/axes.mjs"

import {drawLine2} from "../draw/lines2.mjs"
import {getVertices, newRegression} from "../tools/lineplot.mjs"

import {updateSettings} from "./menu.mjs"
import {addPanelEvents} from "./events/all.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"

let plot = data.plot
let plots = plot.plots

export function addLinePanel(panelSetting, parentPanel=null) {

  let linePanel = "<div id='line' class='panel'></div>"
  let floatingPanel = (plot.type != "Indicator")

  if (floatingPanel) { $("body").append(linePanel) } else { parentPanel.append(linePanel) }

  let panel = $("#line.panel")
  let generalSettings = localRead("settings").general

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  if (floatingPanel) { panel.append("<h1 id='name'>" + plot.x.name + "</h1>") }

  let regression = ""

  regression += "<input type='radio' id='lin-reg' class='reg-radio' name='reg' value='1'>"
  regression += "<label for='lin-reg'>linReg</label>"
  regression += "<input type='radio' id='poly-reg-2' class='reg-radio' name='reg' value='2'>"
  regression += "<label for='poly-reg-2'>polyReg2</label>"
  regression += "<input type='radio' id='poly-reg-3' class='reg-radio' name='reg' value='3'>"
  regression += "<label for='poly-reg-3'>polyReg3</label>"

  let tangent = "<input type='checkbox' id='tan' class='tan-chk'><label>Show Tangent</label>"

  panel.append("<div id='reg-and-tan'>" + regression + tangent + "</div>")

  let reg = (generalSettings.regression == "1") ? ("#lin-reg") : (generalSettings.regression == "2") ? ("#poly-reg-2") : (generalSettings.regression == "3") ? ("#poly-reg-3") : (null)

  if (reg) { $(reg).prop("checked", true) }

  panel.append("<svg id='lineplot'></svg>")
  panel.append("<svg id='linezone'></svg>")

  scaleLine(plot.type)
  drawAxes(plot.type)

  plot.line.xRegVals = []
  plot.line.yRegVals = []

  let lines = (plot.type != "Indicator") ? (plots) : (plots.countries)

  for (let i = 0; i < lines.length; i++) {

    drawLine2(getVertices(lines[i]), regionsColourSwitch(lines[i].region), lines[i].code)

  }

  drawLine2([{"year": plot.t.year, "value": plot.line.min}, {"year": plot.t.year, "value": plot.line.max}], regionsColourSwitch(null), "track")

  if (generalSettings.regression) {

    drawLine2(newRegression(generalSettings.regression), regionsColourSwitch(null), "regression")

  }

  $(".reg-radio").click(function(event) {

    $("#regression.line").remove()

    generalSettings = localRead("settings").general

    if (this.value == generalSettings.regression) {

      this.checked = false

      updateSettings("general", "regression", null)

    } else {

      drawLine2(newRegression(this.value), regionsColourSwitch(null), "regression")

      updateSettings("general", "regression", this.value)

    }

  })

  if (floatingPanel) { addPanelEvents(panel) }

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}
