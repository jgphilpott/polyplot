import {rainbow} from "../../../../libs/mjs/colors/solid/rainbow.mjs"
import {orthographic} from "../../../../libs/mjs/cartography/projections.mjs"
import {makeScrollable} from "../../../../libs/mjs/panels/events/scroll.mjs"
import {regionsColourSwitch} from "../../../../libs/mjs/colors/switches/regions.mjs"

$(document).ready(function() {

  $("body").append("<canvas id='canvas'></canvas>")

  summonParticleWeb(42, rainbow)

  let country = data.country

  $("body").append("<div id='country' class='panel'><a href='/api/countries/" + country.code + "'><h1 id='name'>" + country.name + "</h1></a></div>")

  let panel = $("#country.panel")

  panel.append("<svg id='miniMap'></svg>")

  panel.append("<img class='flag' src='/front/imgs/flags/" + country.code + ".png'>")
  panel.append("<p><b>Formal Name:</b> " + country.formal_name + "</p>")
  panel.append("<p><b>Region:</b> " + country.region + "</p>")

  socket.emit("get_maps")

  socket.on("new_maps", function(maps) {

    let centroid = data.country.centroid

    let canvas = d3.select("#miniMap")
    let projection = orthographic.scale(200).translate([200, 200])
    let path = d3.geoPath().projection(projection.rotate([-centroid.longitude, -centroid.latitude, 0]))

    let graticule = d3.geoGraticule()
    let map = {"type": "FeatureCollection", "features": maps}

    canvas.append("g")
          .append("path")
          .datum(graticule)
          .attr("d", path)
          .attr("class", "graticule")
          .style("stroke", "lightgray")
          .style("fill", "none")

    canvas.selectAll(".map")
          .data(map.features)
          .enter()
          .append("path")
          .attr("d", path)
          .attr("id", function(feature) {

            return feature.properties.code

          })
          .attr("class", "map")
          .attr("fill", function(feature) {

            if (feature.properties.code == data.country.code) {
              return rainbow[0]
            } else {
              return "gray"
            }

          })

    canvas.call(d3.drag()
                  .on("drag", function drag() {

                    let rotate = projection.rotate()
                    let scale = 75 / projection.scale()

                    projection.rotate([
                      rotate[0] + d3.event.dx * scale,
                      rotate[1] - d3.event.dy * scale
                    ])

                    let pathGenerator = d3.geoPath().projection(projection)

                    canvas.selectAll(".graticule").attr("d", pathGenerator)
                    canvas.selectAll(".map").attr("d", pathGenerator)

                  }))

  })

  makeScrollable(panel)

})
