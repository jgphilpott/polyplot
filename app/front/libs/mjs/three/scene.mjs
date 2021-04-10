import {white} from "../colors/three/grayscale.mjs"

export function newScene(color=white) {

  let scene = new THREE.Scene()

  scene.background = color

  return scene

}
