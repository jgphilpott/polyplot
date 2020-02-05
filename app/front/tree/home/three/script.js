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

  domEvents	= new THREEx.DomEvents(camera, renderer.domElement)

  min_year = 1960
  year = 1992
  max_year = 2019

  // console.log(axis_abs_value("x", "max"))
  // console.log(axis_abs_value("y", "max"))
  // console.log(axis_abs_value("z", "max"))

  make_draggable("legend")

  sphere = new_sphere(3, 50, 50, 50)
  domEvents.addEventListener(sphere, 'click', function(event){

    console.log(min_year)
  }, false)
  scene.add(sphere)

  sphere = new_sphere(3, 30, 30, 30)
  domEvents.addEventListener(sphere, 'click', function(event){
    console.log("30")
  }, false)
  scene.add(sphere)

  // for (var i = 0; i < data.length; i++) {
  //
  //   x = data[i]["x"].find(item => item.year == year)["value"]
  //   y = data[i]["y"].find(item => item.year == year)["value"]
  //   z = data[i]["z"].find(item => item.year == year)["value"]
  //
  //   x = scale_value(x, [-10, 10], [-100, 100])
  //   z = scale_value(z, [0, 10], [0, 100])
  //
  //   if (x != null && y != null && z != null) {
  //     sphere = new_sphere(3, x, y, z)
  //     domEvents.addEventListener(sphere, 'click', function(event){
  //     	console.log(i)
  //     }, false)
  //     scene.add(sphere)
  //   }
  //
  // }

  function animate() {

  	requestAnimationFrame(animate)

    controls.update()

  	renderer.render(scene, camera)

  }

  animate()

})
