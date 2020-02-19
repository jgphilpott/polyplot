import {width, height} from "../../../libs/mjs/env/dimensions.mjs"

import {newRenderer} from "../../../libs/mjs/threeCore/renderer.mjs"
import {newCanvas} from "../../../libs/mjs/threeCore/canvas.mjs"
import {newScene} from "../../../libs/mjs/threeCore/scene.mjs"
import {xEvent, xEvents} from "../../../libs/mjs/threeCore/events.mjs"

import {addAmbientLight} from "../../../libs/mjs/lights/ambient.mjs"
import {addPointLight} from "../../../libs/mjs/lights/point.mjs"

import {newPerspectiveCamera} from "../../../libs/mjs/cameras/perspective.mjs"

import {newOrbitControls} from "../../../libs/mjs/controls/orbit.mjs"

import {addAxes} from "../../../libs/mjs/geometries/axes.mjs"
import {newSphere} from "../../../libs/mjs/geometries/sphere.mjs"

import {rScale, xScale, yScale, zScale} from "../../../libs/mjs/scales/axes.mjs"

import {regionsColourSwitch} from "../../../libs/mjs/colors/switches/regions.mjs"

import {metaUpdate, metaClear} from "../../../libs/mjs/panels/meta.mjs"

import {animatePlots} from "../../../libs/mjs/animation/plots.mjs"

$(document).ready(function() {

  // Setup
  data.plot.renderer = newRenderer(width, height)
  data.plot.canvas = newCanvas(data.plot.renderer)
  data.plot.scene = newScene()

  // Lights
  addAmbientLight(data.plot.scene)
  addPointLight(data.plot.scene)

  // Camera
  let camera = newPerspectiveCamera(width, height)

  // Action
  let controls = newOrbitControls(camera, data.plot.canvas)
  let dom	= xEvents(camera, data.plot.renderer)

  addAxes(data.plot.scene)

  let plots = data.plot.plots

  for (let i = 0; i < plots.length; i++) {

    let r = plots[i]["r"].find(item => item.year == data.plot.year).value
    let x = plots[i]["x"].find(item => item.year == data.plot.year).value
    let y = plots[i]["y"].find(item => item.year == data.plot.year).value
    let z = plots[i]["z"].find(item => item.year == data.plot.year).value

    if (r != null && x != null && y != null && z != null) {

      r = rScale(r)
      x = xScale(x)
      y = yScale(y)
      z = zScale(z)

      let sphere = newSphere(r, x, y, z, regionsColourSwitch(plots[i]["region"]))
      xEvent(dom, sphere, "mouseover", metaUpdate, plots[i]["code"])
      xEvent(dom, sphere, "mouseout", metaClear)
      plots[i]["object"] = sphere
      data.plot.scene.add(sphere)

    } else {

      plots[i]["object"] = null

    }

  }

  $("body").on("keypress", function(event) {

    if (event.keyCode == 32) {

      animatePlots(dom)

    }

  })

  function animate() {

  	requestAnimationFrame(animate)

    controls.update()

  	data.plot.renderer.render(data.plot.scene, camera)

  }

  animate()

})
