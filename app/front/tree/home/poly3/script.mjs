import {setup} from "../../../libs/mjs/three/setup.mjs"

import {addPanels} from "../../../libs/mjs/panels/all.mjs"

import {scaleAxes} from "../../../libs/mjs/scales/axes.mjs"
import {drawAxes} from "../../../libs/mjs/draw/axes.mjs"

import {drawSpheres} from "../../../libs/mjs/draw/spheres.mjs"

import {animatePlot} from "../../../libs/mjs/animation/plot.mjs"

let plotType = data.plot.type

$(document).ready(function() {

  setup()

  addPanels(plotType)

  scaleAxes(plotType)
  drawAxes(plotType)

  drawSpheres(plotType)

  animatePlot()

})
