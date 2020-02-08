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

  dom	= new THREEx.DomEvents(camera, renderer.domElement)
  axes = new_axes(scene, 100, 100, 100)

  for (var i = 0; i < data.length; i++) {

    r = data[i]["r"].find(item => item.year == year)["value"]
    x = data[i]["x"].find(item => item.year == year)["value"]
    y = data[i]["y"].find(item => item.year == year)["value"]
    z = data[i]["z"].find(item => item.year == year)["value"]

    if (r != null && x != null && y != null && z != null) {

      r_max = axis_abs_value("r", "max")
      x_max = axis_abs_value("x", "max")
      y_max = axis_abs_value("y", "max")
      z_max = axis_abs_value("z", "max")

      r = scale_value(r, [0, r_max], [0.5, 5])
      x = scale_value(x, [-x_max, x_max], [-100, 100])
      y = scale_value(y, [-y_max, y_max], [-100, 100])
      z = scale_value(z, [-z_max, z_max], [-100, 100])

      sphere = new_sphere(r, x, y, z, regionsColourSwitch(data[i]["region"]))
      addEventListener(dom, sphere, "mouseover", metaUpdate, data[i]["code"])
      addEventListener(dom, sphere, "mouseout", metaClear)
      scene.add(sphere)

    }

  }

  function animate() {

  	requestAnimationFrame(animate)

    controls.update()

  	renderer.render(scene, camera)

  }

  animate()

})
