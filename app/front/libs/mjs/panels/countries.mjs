import {updateSettings} from "./menu.mjs"
import {addPanelEvents} from "./events/all.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"

let plot = data.plot
let plots = plot.plots

export function addCountriesPanel(panelSetting) {

  $("body").append("<div id='countries' class='panel'><h1 id='name'><a href='/countries'>Countries by Region</a></h1></div>")

  let panel = $("#countries.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  socket.emit("get_meta", "regions_countries")

  socket.on("new_regions_countries", function(regions) {

    addRegionBoxes(regions)
    addCountryBoxes(plots)

    let panelWidth = panel.width()
    let panelHeight = panel.height()

    panel.width(panelWidth).height(panelHeight)

    $(".region-fold").click(function() {
      toggleFold(this, panel, panelWidth, panelHeight)
    })

    $(".region-visibility").click(function() {
      toggleRegionVisibility(this)
    })

    $(".country-visibility").click(function() {
      toggleCountryVisibility(this)
    })

    addPanelEvents(panel)

    if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

  })

}

export function toggleFold(element, panel, panelWidth=null, panelHeight=null, duration=1000) {

  let id = $(element).parent().parent().attr("id")
  let fold = $("#" + id + ".region-box .region-fold")

  let regionBox = $("#" + id + ".region-box")
  let headHeight = $("#" + id + ".region-box .region-head").height() + Number(regionBox.css("padding").replace(/[a-z]/gi, "")) * 2
  let countriesBox = $("#" + id + ".region-box .countries-box")

  if (countriesBox.css("display") == "none") {

    if (plot.type == "Countries" || plot.type == "Indicator") {

      countriesBox.css("display", "block")
      let height = countriesBox.height()

      regionBox.animate({height: height + headHeight}, {duration: duration, complete: function() { regionBox.height("auto") }})
      rotate(fold, 90, duration)

    } else {

      let folds = $(".region-fold")

      let width = countriesBox.width()
      let height = countriesBox.height()

      panel.width("auto").height("auto")

      $(".region-box").animate({width: width}, {duration: duration, queue: false})
      $(".region-box").animate({height: headHeight}, {duration: duration, queue: false})
      $(".countries-box").css("display", "none")

      for (let i = 0; i < folds.length; i++) { rotate($(folds[i]), 0, duration) }

      regionBox.animate({width: width}, {duration: duration, queue: false})
      regionBox.animate({height: height + headHeight}, {duration: duration, queue: false})
      countriesBox.css("display", "block")

      rotate(fold, 90, duration)

    }

  } else {

    if (plot.type == "Countries" || plot.type == "Indicator") {

      regionBox.animate({height: headHeight}, {duration: duration, complete: function() { countriesBox.css("display", "none") }})
      rotate(fold, 0, duration)

    } else {

      $(".region-box").animate({width: panelWidth}, {duration: duration, queue: false})
      $(".region-box").animate({height: headHeight}, {duration: duration, queue: false})
      $(".countries-box").css("display", "none")

      rotate(fold, 0, duration)

    }

  }

}

export function addRegionBoxes(regions) {

  let panel = null

  if (plot.type == "Indicator") {
    panel = $("#indicator.panel")
  } else {
    panel = $("#countries.panel")
  }

  let countryExceptions = data.client.settings.general.countryExceptions

  for (let i = 0; i < regions.length; i++) {

    let exception = countryExceptions.includes(camalize(regions[i]))

    let regionBox = "<div id='" + camalize(regions[i]) + "' class='region-box'><div class='region-head'>"

    regionBox += "<img class='region-fold' src='/front/imgs/panels/countries/fold.png'>"
    regionBox += "<h3 class='region-name'>" + regions[i] + "</h3>"

    if (exception) {
      regionBox += "<img class='region-visibility' src='/front/imgs/panels/countries/hidden.png'></div>"
    } else {
      regionBox += "<img class='region-visibility' src='/front/imgs/panels/countries/visible.png'></div>"
    }

    regionBox += "<div class='countries-box'></div></div>"

    panel.append(regionBox)

    if (exception) {
      $("#" + camalize(regions[i]) + " .region-name").css("color", "gray")
    }

    if (plot.type == "Indicator") {
      toggleFold($("#" + camalize(regions[i]) + ".region-box .region-fold"), panel)
    }

    $("#" + camalize(regions[i]) + ".region-box").css("border-left", "5px solid " + regionsColourSwitch(regions[i]) + "")

  }

}

export function addCountryBoxes(countries) {

  let year = readCookie("year")

  countries.sort((a, b) => a.name.localeCompare(b.name))
  let countryExceptions = data.client.settings.general.countryExceptions

  for (let i = 0; i < countries.length; i++) {

    let exception = countryExceptions.includes(countries[i].code)

    let countriesBox = $("#" + camalize(countries[i].region) + ".region-box .countries-box")
    let countryBox = "<div id='" + countries[i].code + "' class='country-box'>"

    if (exception) {
      countryBox += "<img class='country-visibility' src='/front/imgs/panels/countries/hidden.png'>"
    } else {
      countryBox += "<img class='country-visibility' src='/front/imgs/panels/countries/visible.png'>"
    }

    if (plot.type == "Countries") {

      countryBox += "<img class='country-flag' src='/front/imgs/flags/" + countries[i].code + ".png'>"
      countryBox += "<a href='/countries/" + countries[i].code + "'><div><p class='country-name'><span>" + countries[i].name + "</span></p>"
      countryBox += "<p class='country-formal-name'>" + countries[i].formal_name + "</p></div></a>"

    } else if (plot.type == "Indicator") {

      let value = countries[i].history.find(date => date.year == Number(year)).value

      countryBox += "<svg class='country-completeness'></svg>"
      countryBox += "<p class='country-name'><span>" + countries[i].name + "</span></p>"
      countryBox += "<p class='country-value'>" + (typeof(value) == "number" ? format(value, "oodles") : "None") + "</p>"
      countryBox += "<a href='" + countries[i].wiki + "'><img class='country-wiki' src='/front/imgs/panels/countries/wiki.png'></a>"

    } else {

      countryBox += "<p class='country-name'><a href='/countries/" + countries[i].code + "'>" + countries[i].name + "</a></p>"

    }

    countriesBox.append(countryBox + "</div>")

    if (exception) {
      $("#" + countries[i].code + ".country-box .country-name").css("color", "gray")
      $("#" + countries[i].code + ".country-box .country-formal-name").css("color", "gray")
    }

    if (plot.type == "Indicator") {

      $("#" + camalize(countries[i].region) + ".region-box .countries-box #" + countries[i].code + ".country-box .country-name span").on("click", function() { window.location = "/countries/" + countries[i].code + "" })

      let pie = d3.pie().sort(null)
      let arc = d3.arc().innerRadius(8).outerRadius(12)
      let svg = d3.select("#" + camalize(countries[i].region) + ".region-box .countries-box #" + countries[i].code + ".country-box svg")

      svg.selectAll(".country-completeness")
         .data(pie([countries[i].completeness, 100 - countries[i].completeness]))
         .enter()
         .append("path")
         .attr("d", arc)
         .attr("transform", "translate(14, 14)")
         .style("fill", function(data) {

           let scale = d3.scaleLinear().range(["red", "orange", "green"]).domain([0, 50, 100])

           return [scale(countries[i].completeness), "none"][data.index]

         })

    }

  }

}

export function toggleRegionVisibility(element) {

  let countries = null

  if (plot.type == "Indicator") {
    countries = plots.countries
  } else {
    countries = plots
  }

  let code = $(element).parent().parent().attr("id")
  let value = $(element).attr("src").split("/").pop().split(".")[0]
  let countryExceptions = data.client.settings.general.countryExceptions

  if (value == "visible") {

    $("#" + code + " .region-name").css("color", "gray")
    $(element).attr("src", "/front/imgs/panels/countries/hidden.png")

    countryExceptions.push(code)

  } else if (value == "hidden") {

    $("#" + code + " .region-name").css("color", "black")
    $(element).attr("src", "/front/imgs/panels/countries/visible.png")

    countryExceptions = countryExceptions.filter(item => item != code)

  }

  for (let i = 0; i < countries.length; i++) {

    if (code == camalize(countries[i].region)) {

      if (value == "visible") {

        $("#" + countries[i].code + ".country-box .country-visibility").attr("src", "/front/imgs/panels/countries/hidden.png")
        $("#" + countries[i].code + ".country-box .country-name").css("color", "gray")
        $("#" + countries[i].code + ".country-box .country-formal-name").css("color", "gray")

        countryExceptions.push(countries[i].code)

      } else if (value == "hidden") {

        $("#" + countries[i].code + ".country-box .country-visibility").attr("src", "/front/imgs/panels/countries/visible.png")
        $("#" + countries[i].code + ".country-box .country-name").css("color", "black")
        $("#" + countries[i].code + ".country-box .country-formal-name").css("color", "black")

        countryExceptions = countryExceptions.filter(item => item != countries[i].code)

      }

    }

  }

  updateSettings("general", "countryExceptions", countryExceptions)

}

export function toggleCountryVisibility(element) {

  let code, region = null

  if (plot.type == "Country") {

    code = plots.code
    region = camalize(plots.region)

  } else {

    code = $(element).parent().attr("id")
    region = $(element).parent().parent().parent().attr("id")

  }

  let value = $(element).attr("src").split("/").pop().split(".")[0]
  let countryExceptions = data.client.settings.general.countryExceptions

  if (value == "visible") {

    $(element).attr("src", "/front/imgs/panels/countries/hidden.png")
    $("#" + code + ".country-box .country-name").css("color", "gray")
    $("#" + code + ".country-box .country-formal-name").css("color", "gray")

    countryExceptions.push(code)

    let fullset = null

    if (plot.type == "Country") {
      fullset = subset(plot.GeoJSON.features.filter(plot => camalize(plot.properties.region) == region).map(plot => plot.properties.code), countryExceptions)
    } else if (plot.type == "Indicator") {
      fullset = subset(plots.countries.filter(plot => camalize(plot.region) == region).map(plot => plot.code), countryExceptions)
    } else {
      fullset = subset(plots.filter(plot => camalize(plot.region) == region).map(plot => plot.code), countryExceptions)
    }

    if (fullset) {

      $("#" + region + " .region-name").css("color", "gray")
      $("#" + region + " .region-visibility").attr("src", "/front/imgs/panels/countries/hidden.png")

      countryExceptions.push(region)

    }

  } else if (value == "hidden") {

    $(element).attr("src", "/front/imgs/panels/countries/visible.png")
    $("#" + code + ".country-box .country-name").css("color", "black")
    $("#" + code + ".country-box .country-formal-name").css("color", "black")

    $("#" + region + " .region-name").css("color", "black")
    $("#" + region + " .region-visibility").attr("src", "/front/imgs/panels/countries/visible.png")

    countryExceptions = countryExceptions.filter(item => item != code)
    countryExceptions = countryExceptions.filter(item => item != region)

  }

  updateSettings("general", "countryExceptions", countryExceptions)

}