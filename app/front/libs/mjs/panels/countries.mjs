import {updateList} from "./menu.mjs"
import {addPanelEvents} from "./events/all.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"

let plot = data.plot
let plots = plot.plots

let countryExceptions = localRead("settings")["general"]["countryExceptions"]

export function addCountriesPanel(panelSetting) {

  $("body").append("<div id='countries' class='panel'><h1 id='name'>Countries by Region</h1></div>")

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

  })

  addPanelEvents(panel)

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}

export function toggleFold(element, panel, panelWidth=null, panelHeight=null) {

  let duration = 1000

  let id = $(element).parent().parent().attr("id")
  let fold = $("#" + id + ".region-box .region-fold")
  let regionBox = $("#" + id + ".region-box")
  let headHeight = $("#" + id + ".region-box .region-head").height() + Number(regionBox.css("padding").replace(/[a-z]/gi, "")) * 2
  let countriesBox = $("#" + id + ".region-box .countries-box")

  if (countriesBox.css("display") == "none") {

    if (plot.type == "Countries") {

      countriesBox.css("display", "block")
      let height = countriesBox.height()

      regionBox.animate({height: height + headHeight}, {duration: duration, complete: function() { regionBox.height("auto") }})
      rotate(fold, 90, duration)

    } else {

      panel.width("auto").height("auto")

      countriesBox.css("display", "block")
      let width = countriesBox.width()
      let height = countriesBox.height()
      countriesBox.css("display", "none")

      $(".region-box").animate({width: width}, {duration: duration, queue: false})
      $(".region-box").animate({height: headHeight}, {duration: duration, queue: false})
      $(".countries-box").css("display", "none")
      rotate($(".region-fold"), 0, duration)

      regionBox.animate({width: width}, {duration: duration, queue: false})
      regionBox.animate({height: height + headHeight}, {duration: duration, queue: false})
      countriesBox.css("display", "block")
      rotate(fold, 90)

    }

  } else {

    if (plot.type == "Countries") {

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

  let panel = $("#countries.panel")

  for (let i = 0; i < regions.length; i++) {

    let regionBox = "<div id='" + camalize(regions[i]) + "' class='region-box'><div class='region-head'>"

    regionBox += "<img class='region-fold' src='/front/imgs/panels/countries/fold.png'>"
    regionBox += "<h3 class='region-name'>" + regions[i] + "</h3>"

    if (countryExceptions.includes(camalize(regions[i]))) {

      regionBox += "<img class='region-visibility' src='/front/imgs/panels/countries/hidden.png'></div>"

    } else {

      regionBox += "<img class='region-visibility' src='/front/imgs/panels/countries/visible.png'></div>"

    }

    regionBox += "<div class='countries-box'></div></div>"

    panel.append(regionBox)

    $("#" + camalize(regions[i]) + ".region-box").css("border-left", "5px solid " + regionsColourSwitch(regions[i]) + "")

  }

}

export function addCountryBoxes(countries) {

  for (let i = 0; i < countries.length; i++) {

    let countriesBox = $("#" + camalize(countries[i].region) + " .countries-box")
    let countryBox = "<div id='" + countries[i].code + "' class='country-box'>"

    if (countryExceptions.includes(countries[i].code)) {

      countryBox += "<img class='country-visibility' src='/front/imgs/panels/countries/hidden.png'>"

    } else {

      countryBox += "<img class='country-visibility' src='/front/imgs/panels/countries/visible.png'>"

    }

    if (plot.type == "Countries") {

      countryBox += "<img class='country-flag' src='/front/imgs/flags/" + countries[i].code + ".png'>"
      countryBox += "<a href='/countries/" + countries[i].code + "'><div><p class='country-name'>" + countries[i].name + "</p>"
      countryBox += "<p class='country-formal-name'>" + countries[i].formal_name + "</p></div></a></div>"

    } else {

      countryBox += "<a href='/countries/" + countries[i].code + "'><p class='country-name'>" + countries[i].name + "</p></a></div>"

    }

    countriesBox.append(countryBox)

    if (countryExceptions.includes(countries[i].code)) {

      $("#" + countries[i].code + ".country-box .country-name").css("color", "gray")
      $("#" + countries[i].code + ".country-box .country-formal-name").css("color", "gray")

    }

  }

}

export function toggleRegionVisibility(element) {

  let code = $(element).parent().parent().attr("id")
  let value = $(element).attr("src").split("/").pop().split(".")[0]

  if (value == "visible") {

    $(element).attr("src", "/front/imgs/panels/countries/hidden.png")
    countryExceptions.push(code)

  } else if (value == "hidden") {

    $(element).attr("src", "/front/imgs/panels/countries/visible.png")
    countryExceptions = countryExceptions.filter(item => item != code)

  }

  for (let i = 0; i < plots.length; i++) {

    if (camalize(plots[i].region) == code) {

      if (value == "visible") {

        $("#" + plots[i].code + " .country-visibility").attr("src", "/front/imgs/panels/countries/hidden.png")
        countryExceptions.push(plots[i].code)

        $("#" + plots[i].code + ".country-box .country-name").css("color", "gray")
        $("#" + plots[i].code + ".country-box .country-formal-name").css("color", "gray")

      } else if (value == "hidden") {

        $("#" + plots[i].code + " .country-visibility").attr("src", "/front/imgs/panels/countries/visible.png")
        countryExceptions = countryExceptions.filter(item => item != plots[i].code)

        $("#" + plots[i].code + ".country-box .country-name").css("color", "black")
        $("#" + plots[i].code + ".country-box .country-formal-name").css("color", "black")

      }

    }

  }

  updateList("general", "countryExceptions", countryExceptions)

}

export function toggleCountryVisibility(element) {

  let code = $(element).parent().attr("id")
  let value = $(element).attr("src").split("/").pop().split(".")[0]

  if (value == "visible") {

    $(element).attr("src", "/front/imgs/panels/countries/hidden.png")
    countryExceptions.push(code)

    $("#" + code + ".country-box .country-name").css("color", "gray")
    $("#" + code + ".country-box .country-formal-name").css("color", "gray")

  } else if (value == "hidden") {

    $(element).attr("src", "/front/imgs/panels/countries/visible.png")
    countryExceptions = countryExceptions.filter(item => item != code)

    $("#" + code + ".country-box .country-name").css("color", "black")
    $("#" + code + ".country-box .country-formal-name").css("color", "black")

    let region = $(element).parent().parent().parent().attr("id")
    $("#" + region + " .region-visibility").attr("src", "/front/imgs/panels/countries/visible.png")
    countryExceptions = countryExceptions.filter(item => item != region)

  }

  updateList("general", "countryExceptions", countryExceptions)

}
