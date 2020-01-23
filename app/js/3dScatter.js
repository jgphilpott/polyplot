$(document).ready(function() {

  console.log(data)

  let width = $(window).width()
  let height = $(window).height()

  let renderer = new THREE.WebGLRenderer()
  renderer.setSize(width, height)

  let canvas = document.body.appendChild(renderer.domElement)

  let scene = new THREE.Scene()
  scene.background = new THREE.Color(0xffffff)

  let fov = 75
  let near = 1
  let far = 1000

  let camera = new THREE.PerspectiveCamera(fov, width/height, near, far)

  camera.position.x = 100
  camera.position.y = 100
  camera.position.z = 100

  let controls = new THREE.OrbitControls(camera, canvas)

  let a_material = new THREE.LineBasicMaterial({color: 0x000000, linewidth: 1})
  let b_material = new THREE.LineBasicMaterial({color: 0x0000ff, linewidth: 0.5})
  let c_material = new THREE.LineBasicMaterial({color: 0x00ff00, linewidth: 0.1})

  let x_axis = new THREE.Geometry()
  x_axis.vertices.push(new THREE.Vector3(100, 0, 0))
  x_axis.vertices.push(new THREE.Vector3(-100, 0, 0))

  let y_axis = new THREE.Geometry()
  y_axis.vertices.push(new THREE.Vector3(0, 100, 0))
  y_axis.vertices.push(new THREE.Vector3(0, -100, 0))

  let z_axis = new THREE.Geometry()
  z_axis.vertices.push(new THREE.Vector3(0, 0, 100))
  z_axis.vertices.push(new THREE.Vector3(0, 0, -100))

  let x_line = new THREE.Line(x_axis, a_material)
  let y_line = new THREE.Line(y_axis, a_material)
  let z_line = new THREE.Line(z_axis, a_material)

  scene.add(x_line)
  scene.add(y_line)
  scene.add(z_line)

  let geometry = new THREE.SphereGeometry( 3, 32, 32)
  let material = new THREE.MeshStandardMaterial( {color: 0x0000ff} )

  let light = new THREE.PointLight(0xffffff, 3)
  light.position.set(-100,200,100)
  scene.add(light)

  function animate() {

  	requestAnimationFrame(animate)

    controls.update()

  	renderer.render(scene, camera)

  }

  animate()

})
