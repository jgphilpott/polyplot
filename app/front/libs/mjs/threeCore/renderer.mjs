export function newRenderer(width, height) {

  let renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  return renderer

}
