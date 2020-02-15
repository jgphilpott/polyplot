import {year} from "../../../libs/mjs/time/years.mjs"

import {rainbow} from "../../../libs/mjs/colors/three/rainbow.mjs"
import {grayscale} from "../../../libs/mjs/colors/three/grayscale.mjs"
import {regionsColourSwitch} from "../../../libs/mjs/colors/switches/regions.mjs"

import {min, max, width, height} from "../../../libs/mjs/env/dimensions.mjs"

import {newRenderer} from "../../../libs/mjs/threeCore/renderer.mjs"
import {newCanvas} from "../../../libs/mjs/threeCore/canvas.mjs"
import {newScene} from "../../../libs/mjs/threeCore/scene.mjs"
import {xEvents, xEvent} from "../../../libs/mjs/threeCore/events.mjs"

import {addPointLight} from "../../../libs/mjs/lights/point.mjs"

import {newPerspectiveCamera} from "../../../libs/mjs/cameras/perspective.mjs"

import {newOrbitControls} from "../../../libs/mjs/controls/orbit.mjs"

import {rangeAxis, absMaxValue} from "../../../libs/mjs/scales/range.mjs"
import {linearScale} from "../../../libs/mjs/scales/linear.mjs"

import {addAxes} from "../../../libs/mjs/geometries/axes.mjs"
import {newSphere} from "../../../libs/mjs/geometries/sphere.mjs"

import {metaUpdate, metaClear} from "../../../libs/mjs/panels/meta.mjs"

$(document).ready(function() {

  // Setup
  let renderer = newRenderer(width, height)
  let canvas = newCanvas(renderer)
  let scene = newScene()

  // Lights
  addPointLight(scene, grayscale[4], 2)

  // Camera
  let camera = newPerspectiveCamera(width, height)

  // Action
  let controls = newOrbitControls(camera, canvas)
  let dom	= xEvents(camera, renderer)

  let rMax = absMaxValue(rangeAxis("r"))
  let xMax = absMaxValue(rangeAxis("x"))
  let yMax = absMaxValue(rangeAxis("y"))
  let zMax = absMaxValue(rangeAxis("z"))

  addAxes(scene)

  for (let i = 0; i < data.length; i++) {

    let r = data[i]["r"].find(item => item.year == year)["value"]
    let x = data[i]["x"].find(item => item.year == year)["value"]
    let y = data[i]["y"].find(item => item.year == year)["value"]
    let z = data[i]["z"].find(item => item.year == year)["value"]

    if (r != null && x != null && y != null && z != null) {

      r = linearScale(r, [min, rMax], [max / 150, max / 15])
      x = linearScale(x, [-xMax, xMax], [-max, max])
      y = linearScale(y, [-yMax, yMax], [-max, max])
      z = linearScale(z, [-zMax, zMax], [-max, max])

      let sphere = newSphere(r, x, y, z, regionsColourSwitch(data[i]["region"]))
      xEvent(dom, sphere, "mouseover", metaUpdate, data[i]["code"])
      xEvent(dom, sphere, "mouseout", metaClear)
      scene.add(sphere)

    }

  }

  function animate() {

  	requestAnimationFrame(animate)

    controls.update()

  	renderer.render(scene, camera)

  }

  animate()

})
