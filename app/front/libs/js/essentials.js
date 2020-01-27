function new_renderer(width, height) {

  renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)
  return renderer

}

function new_canvas(renderer) {

  return document.body.appendChild(renderer.domElement)

}

function new_scene(color=white) {

  scene = new THREE.Scene()
  scene.background = color
  return scene

}
