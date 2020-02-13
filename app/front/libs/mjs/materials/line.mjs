import {black} from "../colors/three/grayscale.mjs"

export function newLineMaterial(color=black, width=1) {

  return new THREE.LineBasicMaterial({color: color, linewidth: width})

}
