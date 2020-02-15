import {black} from "../colors/three/grayscale.mjs"
import {newMeshMaterial} from "../materials/mesh.mjs"

export function newSphere(r, x, y, z, color=black) {

  let sphere = new THREE.Mesh(new THREE.SphereGeometry(r, 42, 42), newMeshMaterial(color))
  sphere.position.set(x, y, z)
  return sphere

}
