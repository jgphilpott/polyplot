import {event} from "../three/x.mjs"
import {focus} from "../controls/focus.mjs"
import {drawLine} from "./lines.mjs"
import {black} from "../colors/three/grayscale.mjs"
import {red, green, blue} from "../colors/three/rainbow.mjs"
import {min, max, width, height} from "../env/window.mjs"

let plot = data.plot
let plots = plot.plots

export function drawAxes(plotType=plot.type) {

  if (plotType == "Poly2") {

    $(".axis").remove()

    let canvas = d3.select("#canvas")

    canvas.append("g")
          .attr("id", "xAxis")
          .attr("class", "axis")
          .attr("transform", "translate(0, " + height() + ")")
          .call(d3.axisBottom(plot.x.scale)
                  .tickSize(-height())
                  .ticks(7))

    canvas.append("g")
          .attr("id", "yAxis")
          .attr("class", "axis")
          .attr("transform", "translate(0, 0)")
          .call(d3.axisLeft(plot.y.scale)
                  .tickSize(-width())
                  .ticks(7))

    d3.selectAll(".axis").setAsBackLayer()

  } else if (plotType == "Poly3") {

    plot.core.scene.remove(plot.x.axis)
    plot.core.scene.remove(plot.y.axis)
    plot.core.scene.remove(plot.z.axis)

    plot.x.axis = drawLine([[max, min, min], [-max, min, min]], red)
    plot.y.axis = drawLine([[min, max, min], [min, -max, min]], green)
    plot.z.axis = drawLine([[min, min, max], [min, min, -max]], blue)

    plot.core.scene.remove(plot.r.centroid)
    plot.core.scene.remove(plot.x.minCap)
    plot.core.scene.remove(plot.x.maxCap)
    plot.core.scene.remove(plot.y.minCap)
    plot.core.scene.remove(plot.y.maxCap)
    plot.core.scene.remove(plot.z.minCap)
    plot.core.scene.remove(plot.z.maxCap)

    if (localRead("settings").poly3.caps) {

      plot.r.centroid = drawCap(black, min, min, min)
      plot.x.minCap = drawCap(red, -max, min, min)
      plot.x.maxCap = drawCap(green, max, min, min)
      plot.y.minCap = drawCap(red, min, -max, min)
      plot.y.maxCap = drawCap(green, min, max, min)
      plot.z.minCap = drawCap(red, min, min, -max)
      plot.z.maxCap = drawCap(green, min, min, max)

    }

    function drawCap(color, x, y, z) {

      let geometry = new THREE.SphereGeometry(1, 10, 10)
      let material = new THREE.MeshStandardMaterial({"color": color})
      let mesh = new THREE.Mesh(geometry, material)

      mesh.position.set(x, y, z)
      event(mesh, "dblclick", focus, mesh)
      plot.core.scene.add(mesh)

      return mesh

    }

  }

}
