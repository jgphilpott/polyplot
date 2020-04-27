import {makeDragable} from "../ui/dragable.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"

let plot = data.plot

export function addMapPanel() {

  $("body").append("<div id='map' class='panel'></div>")

  let panel = $("#map.panel")

  panel.append("<svg id='svg'></svg>")

  socket.emit("get_maps")

  socket.on("new_maps", function(maps) {

    $("#svg").css("display", "block")

    let svg = d3.select("#svg")

    let geoMercator = d3.geoMercator()
    let geoOrthographic = d3.geoOrthographic()
    let geoEquirectangular = d3.geoEquirectangular()

    let projection = geoOrthographic.fitSize([250, 250], {"type": "FeatureCollection", "features": maps})

    let path = d3.geoPath().projection(projection)

    svg.selectAll(".map")
       .data(maps)
       .enter()
       .append("path")
       .attr("d", path)
       .attr("id", function(feature) {

         return feature.properties.code

       })
       .attr("class", "map")
       .attr("fill", function(feature) {

         return regionsColourSwitch(plot.plots.find(plot => plot.code == feature.properties.code).region, "miniMap")

       })

  })

  makeDragable(panel)

}
