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
