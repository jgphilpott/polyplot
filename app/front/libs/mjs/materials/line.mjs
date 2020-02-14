import {black} from "../colors/three/grayscale.mjs"

export function newLineMaterial(color=black, linewidth=1) {

  return new THREE.LineBasicMaterial({color: color, linewidth: linewidth})

}
