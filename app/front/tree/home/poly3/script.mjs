import {newRenderer} from "../../../libs/mjs/threeCore/renderer.mjs"
import {newCanvas} from "../../../libs/mjs/threeCore/canvas.mjs"
import {newScene} from "../../../libs/mjs/threeCore/scene.mjs"

import {addAmbientLight} from "../../../libs/mjs/lights/ambient.mjs"
import {addPointLight} from "../../../libs/mjs/lights/point.mjs"

import {newPerspectiveCamera} from "../../../libs/mjs/cameras/perspective.mjs"

import {newOrbitControls} from "../../../libs/mjs/controls/orbit.mjs"
import {xEvent, xEvents} from "../../../libs/mjs/threeCore/events.mjs"

import {addAxes} from "../../../libs/mjs/geometries/axes.mjs"
import {newSphere} from "../../../libs/mjs/geometries/sphere.mjs"

import {rScale, xScale, yScale, zScale} from "../../../libs/mjs/scales/axes.mjs"

import {regionsColourSwitch} from "../../../libs/mjs/colors/switches/regions.mjs"

import {metaUpdate, metaClear} from "../../../libs/mjs/panels/meta.mjs"

import {animatePlots} from "../../../libs/mjs/animation/plots.mjs"

$(document).ready(function() {

  let plot = data.plot

  // Setup
  plot.core = {}
  plot.core.renderer = newRenderer()
  plot.core.canvas = newCanvas()
  plot.core.scene = newScene()

  // Lights
  addAmbientLight()
  addPointLight()

  // Camera
  plot.core.camera = newPerspectiveCamera()

  // Action
  plot.core.controls = newOrbitControls()
  plot.core.dom	= xEvents()

  addAxes()

  let plots = plot.plots

  for (let i = 0; i < plots.length; i++) {

    let r = plots[i]["r"].find(item => item.year == plot.time.year).value
    let x = plots[i]["x"].find(item => item.year == plot.time.year).value
    let y = plots[i]["y"].find(item => item.year == plot.time.year).value
    let z = plots[i]["z"].find(item => item.year == plot.time.year).value

    if (r != null && x != null && y != null && z != null) {

      r = rScale(r)
      x = xScale(x)
      y = yScale(y)
      z = zScale(z)

      let sphere = newSphere(r, x, y, z, regionsColourSwitch(plots[i]["region"]))
      xEvent(sphere, "mouseover", metaUpdate, plots[i]["code"])
      xEvent(sphere, "mouseout", metaClear)
      plots[i]["object"] = sphere
      plot.core.scene.add(sphere)

    } else {

      plots[i]["object"] = null

    }

  }

  $("body").on("keypress", function(event) {

    if (event.keyCode == 32) {

      animatePlots()

    }

  })

  function animate() {

  	requestAnimationFrame(animate)

    plot.core.controls.update()

  	plot.core.renderer.render(plot.core.scene, plot.core.camera)

  }

  animate()

  console.log(data)

})
