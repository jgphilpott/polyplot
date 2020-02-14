import {black} from "../colors/three/grayscale.mjs"
import {newMeshMaterial} from "../materials/mesh.mjs"

export function newSphere(size, x, y, z, color=black) {

  let sphere = new THREE.SphereGeometry(size, 32, 32)
  sphere = new THREE.Mesh(sphere, newMeshMaterial(color))
  sphere.position.x = x
  sphere.position.y = y
  sphere.position.z = z
  return sphere

}
