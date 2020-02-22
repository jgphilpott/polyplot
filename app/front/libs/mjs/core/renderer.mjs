import {width, height} from "../env/dimensions.mjs"

export function newRenderer() {

  let renderer = new THREE.WebGLRenderer()
  renderer.setSize(width(), height())
  data.plot.core.frameRate = 60
  return renderer

}
