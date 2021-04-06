import {rainbow} from "../../../../libs/mjs/colors/solid/rainbow.mjs"
import {orthographic} from "../../../../libs/mjs/cartography/projections.mjs"
import {makeScrollable} from "../../../../libs/mjs/panels/events/scroll.mjs"
import {regionsColourSwitch} from "../../../../libs/mjs/colors/switches/regions.mjs"

import {addTimePanel} from "../../../../libs/mjs/panels/time.mjs"
import {toggleCountryVisibility} from "../../../../libs/mjs/panels/countries.mjs"
import {toggleTextbox, addTextbox} from "../../../../libs/mjs/tools/textbox.mjs"
import {toggleFold, addCategoryBoxes, addIndicatorBoxes} from "../../../../libs/mjs/panels/indicators.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  let country = data.plot.plots

  $("body").append("<div id='country' class='panel'><h1 id='name'>" + country.name + "</h1></div>")

  let panel = $("#country.panel")

  let generalSettings = localRead("settings").general

  panel.css("border", "2px solid " + regionsColourSwitch(country.region) + "")

  panel.append("<a href='/api/countries/" + country.code + "'><img id='api' src='/front/imgs/panels/countries/api.png'></a>")
  panel.append("<a href='" + country.wiki + "'><img id='wiki' src='/front/imgs/panels/countries/wiki.png'></a>")

  if (generalSettings.countryExceptions.includes(country.code)) {
    panel.append("<img id='visibility' src='/front/imgs/panels/countries/hidden.png'>")
  } else {
    panel.append("<img id='visibility' src='/front/imgs/panels/countries/visible.png'>")
  }

  $("#visibility").click(function() {
    toggleCountryVisibility(this)
  })

  panel.append("<svg id='globe'></svg>")

  panel.append("<img id='flag' src='/front/imgs/flags/" + country.code + ".png'>")
  panel.append("<p class='stat'><b>Formal Name:</b> " + country.formal_name + "</p>")
  panel.append("<p class='stat'><b>Region:</b> " + country.region + "</p>")

  addTextbox(panel, "country", "Description", country.description)

  $(".textbox-fold").click(function() {
    toggleTextbox(this)
  })

  socket.emit("get_maps", {}, {"_id": 0}, [["properties.code", 1]], 0, "micro")

  socket.on("new_maps", function(maps) {

    let centroid = country.centroid
    let canvas = d3.select("#globe")
    let projection = orthographic.scale(150).translate([150, 150])
    let path = d3.geoPath().projection(projection.rotate([-centroid[0], -centroid[1], 0]))

    let graticule = d3.geoGraticule()
    let map = {"type": "FeatureCollection", "features": maps}

    country.GeoJSON = map

    canvas.append("g")
          .append("path")
          .datum(graticule)
          .attr("d", path)
          .attr("class", "graticule")
          .style("stroke", "gray")
          .style("fill", "none")

    canvas.selectAll(".map")
          .data(map.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("id", function(feature) { return feature.properties.code })
          .attr("class", "map")
          .style("fill", function(feature) {

            if (feature.properties.code == country.code) {
              return regionsColourSwitch(country.region)
            } else {
              return "gray"
            }

          })

    canvas.call(d3.drag()
                  .on("drag", function drag() {

                    $("#globe").css("cursor", "grabbing")

                    let rotate = projection.rotate()
                    let scale = 75 / projection.scale()

                    projection.rotate([
                      rotate[0] + d3.event.dx * scale,
                      rotate[1] - d3.event.dy * scale
                    ])

                    let pathGenerator = d3.geoPath().projection(projection)

                    canvas.selectAll(".graticule").attr("d", pathGenerator)
                    canvas.selectAll(".map").attr("d", pathGenerator)

                  })
                  .on("end", function end() { $("#globe").css("cursor", "grab") })
                )

  })

  socket.emit("get_meta", "categories")

  socket.on("new_categories", function(categories) {

    panel.append("<a href='/indicators'><h1>Indicators by Category</h1></a>")

    let indicators = Object.keys(country.indicators).filter(key => generalSettings.indicatorExceptions.includes(key.replaceAll("-", ".")))
    indicators = Object.values(indicators.reduce((obj, key) => { obj[key] = country.indicators[key]; return obj }, {})).sort((a, b) => a.name.localeCompare(b.name))

    addCategoryBoxes(categories)
    addIndicatorBoxes(indicators)

    $(".category-icon, .category-fold").click(function() {
      toggleFold(this, panel)
    })

  })

  addTimePanel(true, panel)

  makeScrollable(panel)

})
