import {updateMetaPanel} from "../../panels/meta.mjs"
import {updatePoltPanel} from "../../panels/plot.mjs"

let plot = data.plot
let plotType = plot.type

export function animatePanels(duration) {

  let year = plot.t.year
  let generalSettings = data.client.settings.general

  if (plotType == "Country") {

    let country = plot.plots
    let indicators = Object.keys(country.indicators).filter(key => generalSettings.indicatorExceptions.includes(key.replaceAll("-", ".")))
    indicators = Object.values(indicators.reduce((obj, key) => { obj[key] = country.indicators[key]; return obj }, {}))

    for (let i = 0; i < indicators.length; i++) {

      let value = indicators[i].history.find(date => date.year == Number(year)).value

      $("#" + indicators[i].code.replaceAll(".", "-") + ".indicator-box .indicator-value").text(typeof(value) == "number" ? format(value, "oodles") : "None")

    }

  } else if (plotType == "Indicator") {

    let indicator = plot.plots
    let countries = indicator.countries

    for (let i = 0; i < countries.length; i++) {

      let value = countries[i].history.find(date => date.year == Number(year)).value

      $("#" + countries[i].code + ".country-box .country-value").text(typeof(value) == "number" ? format(value, "oodles") : "None")

    }

  } else {

    let meta = $("#meta.panel #flag").attr("src").split("/").pop().split(".")[0]
    if (meta != "null") { updateMetaPanel(meta) }

    let plotPanels = $(".plot.panel")
    for (let i = 0; i < plotPanels.length; i++) { updatePoltPanel(plotPanels[i].id) }

  }

}
