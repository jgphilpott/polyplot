import {newRenderer} from "./renderer.mjs"
import {newCanvas} from "./canvas.mjs"
import {newScene} from "./scene.mjs"

import {addLights} from "../lights/all.mjs"
import {addCamera} from "../cameras/all.mjs"
import {addControls} from "../controls/all.mjs"

data.plot.core = {}
let core = data.plot.core

export function setup() {

  // Setup
  core.renderer = newRenderer()
  core.canvas = newCanvas()
  core.scene = newScene()

  // Lights
  core.lights = addLights()

  // Camera
  core.camera = addCamera()
  core.frameRate = 60

  // Action
  core.controls = addControls()
  core.events = new THREEx.DomEvents(core.camera, core.canvas)

}
