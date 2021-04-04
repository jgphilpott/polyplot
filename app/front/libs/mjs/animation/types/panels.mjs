import {updateMetaPanel} from "../../panels/meta.mjs"
import {updatePoltPanel} from "../../panels/plot.mjs"

let plot = data.plot
let plotType = plot.type

export function animatePanels(duration) {

  let year = readCookie("year")
  let generalSettings = localRead("settings").general

  if (plotType == "Country") {

    let country = plot.plots
    let indicators = Object.keys(country.indicators).filter(key => generalSettings.indicatorExceptions.includes(key.replaceAll("-", ".")))
    indicators = Object.values(indicators.reduce((obj, key) => { obj[key] = country.indicators[key]; return obj }, {}))

    for (let i = 0; i < indicators.length; i++) {
      $("#" + indicators[i].code.replaceAll(".", "-") + ".indicator-box .indicator-value").text(format(indicators[i].history.find(date => date.year == Number(year)).value, "oodles"))
    }

  } else if (plotType == "Indicator") {

    let indicator = plot.plots
    let countries = indicator.countries

    for (let i = 0; i < countries.length; i++) {
      $("#" + countries[i].code + ".country-box .country-value").text(format(countries[i].history.find(date => date.year == Number(year)).value, "oodles"))
    }

  } else {

    let meta = $("#meta.panel #flag").attr("src").split("/").pop().split(".")[0]
    if (meta != "null") { updateMetaPanel(meta) }

    let plotPanels = $(".plot.panel")
    for (let i = 0; i < plotPanels.length; i++) { updatePoltPanel(plotPanels[i].id) }

  }

}
