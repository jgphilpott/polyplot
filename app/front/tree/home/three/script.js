$(document).ready(function() {

  browser = find_browser()

  width = find_width()
  height = find_height()

  renderer = new_renderer(width, height)
  canvas = new_canvas(renderer)
  scene = new_scene()

  light = new_light(scene)
  camera = new_camera(width, height)
  controls = new_controls(camera, canvas)

  axes = new_axes(scene, 100, 100, 100)

  function animate() {

  	requestAnimationFrame(animate)

    controls.update()

  	renderer.render(scene, camera)

  }

  animate()

})
