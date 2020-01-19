$(document).ready(function() {

  var width = $(window).width()
  var height = $(window).height()

  var renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)

  var canvas = document.body.appendChild(renderer.domElement)

  var scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  var fov = 75
  var near = 1
  var far = 1000
  var camera = new THREE.PerspectiveCamera(fov, width/height, near, far)
  camera.position.x = 200
  camera.position.y = 200
  camera.position.z = 200

  var controls = new THREE.OrbitControls(camera, canvas)

  var a_material = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 1})
  var b_material = new THREE.LineBasicMaterial({color: 0x0000ff, linewidth: 0.5})
  var c_material = new THREE.LineBasicMaterial({color: 0x00ff00, linewidth: 0.1})

  var x_axis = new THREE.Geometry()
  x_axis.vertices.push(new THREE.Vector3(100, 0, 0))
  x_axis.vertices.push(new THREE.Vector3(-100, 0, 0))

  var y_axis = new THREE.Geometry()
  y_axis.vertices.push(new THREE.Vector3(0, 100, 0))
  y_axis.vertices.push(new THREE.Vector3(0, -100, 0))

  var z_axis = new THREE.Geometry()
  z_axis.vertices.push(new THREE.Vector3(0, 0, 100))
  z_axis.vertices.push(new THREE.Vector3(0, 0, -100))

  var x_line = new THREE.Line(x_axis, a_material)
  var y_line = new THREE.Line(y_axis, a_material)
  var z_line = new THREE.Line(z_axis, a_material)

  scene.add(x_line)
  scene.add(y_line)
  scene.add(z_line)

  function animate() {

  	requestAnimationFrame(animate)

    controls.update()

  	renderer.render(scene, camera)

  }

  animate()

})
