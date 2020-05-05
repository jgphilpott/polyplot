import {width, height} from "../env/window.mjs"

export function newRenderer() {

  let renderer = new THREE.WebGLRenderer()
  renderer.setSize(width(), height())
  return renderer

}
