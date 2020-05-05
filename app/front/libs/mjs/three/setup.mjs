import {newRenderer} from "../../../libs/mjs/three/renderer.mjs"
import {newCanvas} from "../../../libs/mjs/three/canvas.mjs"
import {newScene} from "../../../libs/mjs/three/scene.mjs"

import {addLights} from "../../../libs/mjs/lights/all.mjs"
import {addCamera} from "../../../libs/mjs/cameras/all.mjs"
import {addControls} from "../../../libs/mjs/controls/all.mjs"

let core = {}
data.plot.core = core

export function setup() {

  // Setup
  core.renderer = newRenderer()
  core.canvas = newCanvas()
  core.scene = newScene()

  // Lights
  core.lights = addLights()

  // Camera
  core.camera = addCamera()

  // Action
  core.controls = addControls()
  core.events = new THREEx.DomEvents(core.camera, core.canvas)

}
