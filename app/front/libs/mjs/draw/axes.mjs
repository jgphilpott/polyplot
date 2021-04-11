import {event} from "../three/x.mjs"
import {focus} from "../controls/focus.mjs"
import {drawLine3} from "./lines3.mjs"

import {black} from "../colors/three/grayscale.mjs"
import {red, green, blue} from "../colors/three/rainbow.mjs"
import {min, max, width, height} from "../env/window.mjs"

let plot = data.plot
let plots = plot.plots

export function drawAxes(plotType=plot.type) {

  let ticks = 7

  if (plotType == "Map" || plotType == "Indicator") {

    $(".axis").remove()

    let canvas = d3.select("#lineplot")

    let linezone = $("svg#linezone")

    let plotWidth = linezone.width()
    let plotHeight = linezone.height()
    let plotMargin = Number(linezone.css("padding").replace(/[a-z]/gi, ""))

    canvas.append("g")
          .attr("id", "x-axis")
          .attr("class", "axis")
          .attr("transform", "translate(" + plotMargin + ", " + (plotHeight + plotMargin) + ")")
          .call(d3.axisBottom(plot.line.x)
                  .tickFormat(d3.format("d"))
                  .tickSize(-plotHeight)
                  .tickSizeOuter(0)
                  .ticks((plot.t.maxCap - plot.t.minCap < ticks) ? (plot.t.maxCap - plot.t.minCap) : (ticks)))

    canvas.append("g")
          .attr("id", "y-axis")
          .attr("class", "axis")
          .attr("transform", "translate(" + plotMargin + ", " + plotMargin + ")")
          .call(d3.axisLeft(plot.line.y)
                  .tickFormat(function(tick) { return format(tick, "oodles") })
                  .tickSize(-plotWidth)
                  .tickSizeOuter(0)
                  .ticks(ticks))

    d3.selectAll(".tick").setAsBackLayer()

  } else if (plotType == "Poly2") {

    $(".axis").remove()

    let canvas = d3.select("#canvas")

    canvas.append("g")
          .attr("id", "x-axis")
          .attr("class", "axis")
          .attr("transform", "translate(0, " + height() + ")")
          .call(d3.axisBottom(plot.x.scale)
                  .tickSize(-height())
                  .ticks(ticks))

    canvas.append("g")
          .attr("id", "y-axis")
          .attr("class", "axis")
          .attr("transform", "translate(0, 0)")
          .call(d3.axisLeft(plot.y.scale)
                  .tickSize(-width())
                  .ticks(ticks))

    d3.selectAll(".axis").setAsBackLayer()

  } else if (plotType == "Poly3") {

    let scene = plot.core.scene

    scene.remove(plot.x.axis)
    scene.remove(plot.y.axis)
    scene.remove(plot.z.axis)

    plot.x.axis = drawLine3([[max, min, min], [-max, min, min]], red)
    plot.y.axis = drawLine3([[min, max, min], [min, -max, min]], green)
    plot.z.axis = drawLine3([[min, min, max], [min, min, -max]], blue)

    scene.remove(plot.r.centroid)
    scene.remove(plot.x.minCap)
    scene.remove(plot.x.maxCap)
    scene.remove(plot.y.minCap)
    scene.remove(plot.y.maxCap)
    scene.remove(plot.z.minCap)
    scene.remove(plot.z.maxCap)

    if (data.client.settings.poly3.caps) {

      plot.r.centroid = drawCap(black, min, min, min)
      plot.x.minCap = drawCap(red, -max, min, min)
      plot.x.maxCap = drawCap(green, max, min, min)
      plot.y.minCap = drawCap(red, min, -max, min)
      plot.y.maxCap = drawCap(green, min, max, min)
      plot.z.minCap = drawCap(red, min, min, -max)
      plot.z.maxCap = drawCap(green, min, min, max)

    }

    function drawCap(color, x, y, z) {

      let geometry = new THREE.SphereGeometry(1, 12, 12)
      let material = new THREE.MeshStandardMaterial({color: color})
      let mesh = new THREE.Mesh(geometry, material)

      mesh.position.set(x, y, z)
      event(mesh, "dblclick", focus, mesh)
      scene.add(mesh)

      return mesh

    }

  }

}
