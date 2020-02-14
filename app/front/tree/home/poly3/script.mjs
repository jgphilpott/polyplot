import {width, height} from "../../../libs/mjs/env/dimensions.mjs"

import {regionsColourSwitch} from "../../../libs/mjs/colors/switches/regions.mjs"

import {newRenderer} from "../../../libs/mjs/threeCore/renderer.mjs"
import {newCanvas} from "../../../libs/mjs/threeCore/canvas.mjs"
import {newScene} from "../../../libs/mjs/threeCore/scene.mjs"
import {addEventListener} from "../../../libs/mjs/threeCore/x.mjs"

import {metaUpdate, metaClear} from "../../../libs/mjs/panels/meta.mjs"

import {newPointLight} from "../../../libs/mjs/lights/point.mjs"
import {newPerspectiveCamera} from "../../../libs/mjs/cameras/perspective.mjs"
import {newOrbitControls} from "../../../libs/mjs/controls/orbit.mjs"

import {addAxes} from "../../../libs/mjs/geometries/axes.mjs"
import {newSphere} from "../../../libs/mjs/geometries/sphere.mjs"

import {year} from "../../../libs/mjs/time/years.mjs"

import {rangeAxis, absMaxValue} from "../../../libs/mjs/scales/range.mjs"
import {linearScale} from "../../../libs/mjs/scales/linear.mjs"

$(document).ready(function() {

  let renderer = newRenderer(width, height)
  let canvas = newCanvas(renderer)
  let scene = newScene()

  let camera = newPerspectiveCamera(width, height)
  let controls = newOrbitControls(camera, canvas)

  let light = newPointLight()
  scene.add(light)

  addAxes(scene)

  let dom	= new THREEx.DomEvents(camera, renderer.domElement)

  let rMax = absMaxValue(rangeAxis("r"))
  let xMax = absMaxValue(rangeAxis("x"))
  let yMax = absMaxValue(rangeAxis("y"))
  let zMax = absMaxValue(rangeAxis("z"))

  for (let i = 0; i < data.length; i++) {

    let r = data[i]["r"].find(item => item.year == year)["value"]
    let x = data[i]["x"].find(item => item.year == year)["value"]
    let y = data[i]["y"].find(item => item.year == year)["value"]
    let z = data[i]["z"].find(item => item.year == year)["value"]

    if (r != null && x != null && y != null && z != null) {

      r = linearScale(r, [0, rMax], [0.7, 7])
      x = linearScale(x, [-xMax, xMax], [-100, 100])
      y = linearScale(y, [-yMax, yMax], [-100, 100])
      z = linearScale(z, [-zMax, zMax], [-100, 100])

      let sphere = newSphere(r, x, y, z, regionsColourSwitch(data[i]["region"]))
      addEventListener(dom, sphere, "mouseover", metaUpdate, data[i]["code"])
      addEventListener(dom, sphere, "mouseout", metaClear)
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
