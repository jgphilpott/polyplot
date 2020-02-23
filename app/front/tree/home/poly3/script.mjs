import {newRenderer} from "../../../libs/mjs/core/renderer.mjs"
import {newCanvas} from "../../../libs/mjs/core/canvas.mjs"
import {newScene} from "../../../libs/mjs/core/scene.mjs"

import {addAmbientLight} from "../../../libs/mjs/lights/ambient.mjs"
import {addPointLight} from "../../../libs/mjs/lights/point.mjs"

import {newPerspectiveCamera} from "../../../libs/mjs/cameras/perspective.mjs"

import {newOrbitControls} from "../../../libs/mjs/controls/orbit.mjs"
import {addEventListeners} from "../../../libs/mjs/events/x.mjs"

import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"
import {addAxes} from "../../../libs/mjs/geometries/axes.mjs"

import {addPlot} from "../../../libs/mjs/geometries/plot.mjs"

import {animatePlot} from "../../../libs/mjs/animation/plot.mjs"

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
  addEventListeners()

  scaleAxes()
  addAxes()

  let plots = plot.plots

  for (let i = 0; i < plots.length; i++) {

    let r = plots[i].r.find(item => item.year == plot.time.year).value
    let x = plots[i].x.find(item => item.year == plot.time.year).value
    let y = plots[i].y.find(item => item.year == plot.time.year).value
    let z = plots[i].z.find(item => item.year == plot.time.year).value

    if (typeof(r) == "number" && typeof(x) == "number" && typeof(y) == "number" && typeof(z) == "number") {

      r = plot.r.scale(r)
      x = plot.x.scale(x)
      y = plot.y.scale(y)
      z = plot.z.scale(z)

      plots[i].object = addPlot(r, x, y, z, plots[i].region, plots[i].code)

    } else {

      plots[i].object = null

    }

  }

  animatePlot()

})
