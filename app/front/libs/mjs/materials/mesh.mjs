import {black} from "../colors/three/grayscale.mjs"

export function newMeshMaterial(color=black) {

  return new THREE.MeshStandardMaterial({color: color})

}
