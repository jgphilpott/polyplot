$(document).ready(function() {

  width = find_width()
  height = find_height()

  renderer = new_renderer(width, height)
  canvas = new_canvas(renderer)
  scene = new_scene()

  camera = new_camera(width, height)
  controls = new_controls(camera, canvas)

  a_material = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 1})
  b_material = new THREE.LineBasicMaterial({color: 0x0000ff, linewidth: 0.5})
  c_material = new THREE.LineBasicMaterial({color: 0x00ff00, linewidth: 0.1})

  x_axis = new THREE.Geometry()
  x_axis.vertices.push(new THREE.Vector3(100, 0, 0))
  x_axis.vertices.push(new THREE.Vector3(-100, 0, 0))

  y_axis = new THREE.Geometry()
  y_axis.vertices.push(new THREE.Vector3(0, 100, 0))
  y_axis.vertices.push(new THREE.Vector3(0, -100, 0))

  z_axis = new THREE.Geometry()
  z_axis.vertices.push(new THREE.Vector3(0, 0, 100))
  z_axis.vertices.push(new THREE.Vector3(0, 0, -100))

  x_line = new THREE.Line(x_axis, a_material)
  y_line = new THREE.Line(y_axis, a_material)
  z_line = new THREE.Line(z_axis, a_material)

  scene.add(x_line)
  scene.add(y_line)
  scene.add(z_line)

  geometry = new THREE.SphereGeometry( 3, 32, 32)
  material = new THREE.MeshStandardMaterial( {color: 0x0000ff} )

  light = new THREE.PointLight(0xffffff, 3)
  light.position.set(-100,200,100)
  scene.add(light)

  function animate() {

  	requestAnimationFrame(animate)

    controls.update()

  	renderer.render(scene, camera)

  }

  animate()

})
