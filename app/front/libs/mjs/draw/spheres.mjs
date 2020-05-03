import {black} from "../colors/three/grayscale.mjs"
import {newMeshMaterial} from "../materials/mesh.mjs"

export function newSphere(r=1, x=0, y=0, z=0, color=black) {

  let sphere = new THREE.Mesh(new THREE.SphereGeometry(r, 42, 42), newMeshMaterial(color))
  sphere.position.set(x, y, z)
  return sphere

}

export function addSphere(r=1, x=0, y=0, z=0, color=black) {

  return data.plot.core.scene.add(sphere = newSphere(r, x, y, z, color))

}

import {black} from "../colors/three/grayscale.mjs"
import {xEvent} from "../core/events.mjs"
import {newSphere} from "./sphere.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"
import {updateMetaPanel, clearMetaPanel} from "../../../libs/mjs/panels/meta.mjs"

export function newPlot(r=1, x=0, y=0, z=0, color=black, code=null) {

  let plot = newSphere(r, x, y, z, regionsColourSwitch(color))
  xEvent(plot, "mouseover", updateMetaPanel, code)
  xEvent(plot, "mouseout", clearMetaPanel)
  return plot

}

export function addPlot(r=1, x=0, y=0, z=0, color=black, code=null) {

  let plot = newPlot(r, x, y, z, color, code)
  data.plot.core.scene.add(plot)
  return plot

}

import {black} from "../colors/three/grayscale.mjs"

export function newMeshMaterial(color=black) {

  return new THREE.MeshStandardMaterial({"color": color})

}
