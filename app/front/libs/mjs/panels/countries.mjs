import {addPanelEvents} from "./events/all.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"

let plot = data.plot
let plots = plot.plots

export function addCountriesPanel(panelSetting) {

  $("body").append("<div id='countries' class='panel'></div>")

  let panel = $("#countries.panel")

  panel.append("<img class='close' src='/front/imgs/panels/all/close.png'>")

  panel.append("<h1 id='name'>Countries by Region</h1>")

  socket.emit("get_meta", "regions-countries")

  socket.on("new_regions-countries", function(regions) {

    for (let i = 0; i < regions.length; i++) {

      let regionBox = "<div id='" + camalize(regions[i]) + "' class='region-box'><div class='head'>"

      regionBox += "<img class='fold' src='/front/imgs/panels/indicators/fold.png'>"
      regionBox += "<h3 class='region-name'>" + regions[i] + "</h3></div>"
      regionBox += "<div class='countries-box'>"

      panel.append(regionBox + "</div></div>")

      $("#" + camalize(regions[i]) + "").css("border-left", "5px solid " + regionsColourSwitch(regions[i]) + "")

    }

    for (let i = 0; i < plots.length; i++) {

      let countriesBox = $("#" + camalize(plots[i].region) + " .countries-box")

      let countryBox = "<div id='" + camalize(plots[i].name) + "' class='country-box'>"

      countryBox += "<img class='visibility' src='/front/imgs/panels/countries/visible.png'>"
      countryBox += "<p class='country-name'>" + plots[i].name + "</p>"

      countriesBox.append(countryBox + "</div>")

    }

    $(".region-box .fold").click(function() {

      let id = $(this).parent().parent().attr("id")
      let fold = $("#" + id + ".region-box .fold")
      let regionBox = $("#" + id + ".region-box")
      let countriesBox = $("#" + id + ".region-box .countries-box")

      if (countriesBox.css("display") == "none") {

        $(".region-box").animate({"width": 782}, {"duration": 1000, "queue": false})
        $(".region-box").animate({"height": 30}, {"duration": 1000, "queue": false})
        $(".countries-box").css("display", "none")
        rotate($(".region-box .fold"), 1)

        countriesBox.css("display", "block")
        let height = countriesBox.height() + 35
        countriesBox.css("display", "none")

        regionBox.animate({"width": 782}, {"duration": 1000, "queue": false})
        regionBox.animate({"height": height}, {"duration": 1000, "queue": false})
        countriesBox.css("display", "block")
        rotate(fold, 90)

      } else {

        $(".region-box").animate({"width": 225}, {"duration": 1000, "queue": false})
        $(".region-box").animate({"height": 30}, {"duration": 1000, "queue": false})
        $(".countries-box").css("display", "none")
        rotate($(".region-box .fold"), 1)

      }

    })

  })

  addPanelEvents(panel)

  if (panelSetting) { panel.css("visibility", "visible") } else { panel.css("visibility", "hidden") }

}
