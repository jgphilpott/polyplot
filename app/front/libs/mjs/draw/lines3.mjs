import {black} from "../colors/three/grayscale.mjs"

export function newVector(vertices=[]) {

  let vector = new THREE.Geometry()

  for (let i = 0; i < vertices.length; i++) {

    vector.vertices.push(new THREE.Vector3(vertices[i][0], vertices[i][1], vertices[i][2]))

  }

  return vector

}

export function newLineMaterial(color=black, linewidth=1) {

  return new THREE.LineBasicMaterial({color: color, linewidth: linewidth})

}

export function newLine3(vertices=[], color=black, linewidth=1) {

  return new THREE.Line(newVector(vertices), newLineMaterial(color, linewidth))

}

export function drawLine3(vertices=[], color=black, linewidth=1) {

  return data.plot.core.scene.add(newLine3(vertices, color, linewidth))

}