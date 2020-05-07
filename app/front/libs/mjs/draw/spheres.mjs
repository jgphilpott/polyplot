import {event} from "../three/x.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"
import {updateMetaPanel, clearMetaPanel} from "../panels/meta.mjs"

let plot = data.plot
let plots = plot.plots

export function drawSphere(sphere, plotType=plot.type) {

  let r = sphere.r.find(date => date.year == plot.t.year).value
  let x = sphere.x.find(date => date.year == plot.t.year).value
  let y = sphere.y.find(date => date.year == plot.t.year).value
  let z = sphere.z.find(date => date.year == plot.t.year).value

  if (typeof(r) == "number" && typeof(x) == "number" && typeof(y) == "number" && typeof(z) == "number") {

    r = plot.r.scale(r)
    x = plot.x.scale(x)
    y = plot.y.scale(y)
    z = plot.z.scale(z)

    let geometry = new THREE.SphereGeometry(r, 42, 42)
    let material = new THREE.MeshStandardMaterial({"color": regionsColourSwitch(sphere.region)})
    let mesh = new THREE.Mesh(geometry, material)

    mesh.position.set(x, y, z)

    event(mesh, "mouseover", updateMetaPanel, sphere.code)
    event(mesh, "mouseout", clearMetaPanel)

    plot.core.scene.add(mesh)

    sphere.object = mesh

  } else {

    sphere.object = null

  }

}

export function drawSpheres(plotType=plot.type) {

  for (let i = 0; i < plots.length; i++) {

    plots[i].object = drawSphere(plots[i])

  }

}
