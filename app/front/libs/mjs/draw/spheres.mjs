import {event} from "../three/x.mjs"
import {focus} from "../controls/focus.mjs"

import {contextMenu} from "../env/context.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"
import {updateMetaPanel, clearMetaPanel} from "../panels/meta.mjs"

let plot = data.plot
let plots = plot.plots

export function drawSphere(sphere, r, x, y, z, plotType=plot.type) {

  let visibility = (data.client.settings.general.countryExceptions.includes(sphere.code) != true)
  let numbers = (typeof(r) == "number" && typeof(x) == "number" && typeof(y) == "number" && typeof(z) == "number")

  if (visibility && numbers) {

    r = plot.r.scale(r)
    x = plot.x.scale(x)
    y = plot.y.scale(y)
    z = plot.z.scale(z)

    let geometry = new THREE.SphereGeometry(r, 12, 12)
    let material = new THREE.MeshStandardMaterial({color: regionsColourSwitch(sphere.region)})
    let mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(x, y, z)

    event(mesh, "mouseover", updateMetaPanel, sphere.code)
    event(mesh, "mouseout", clearMetaPanel)
    event(mesh, "contextmenu", contextMenu, sphere.code, true)
    event(mesh, "dblclick", focus, mesh)

    plot.core.scene.add(mesh)

    return mesh

  } else { return null }

}

export function drawSpheres(plotType=plot.type) {

  for (let i = 0; i < plots.length; i++) {

    let r = plots[i].r.find(date => date.year == plot.t.year).value
    let x = plots[i].x.find(date => date.year == plot.t.year).value
    let y = plots[i].y.find(date => date.year == plot.t.year).value
    let z = plots[i].z.find(date => date.year == plot.t.year).value

    plots[i].object = drawSphere(plots[i], r, x, y, z)

  }

}