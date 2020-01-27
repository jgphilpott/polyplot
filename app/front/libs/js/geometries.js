function new_vector(type, size) {

  vector = new THREE.Geometry()

  if (type == "x") {

    vector.vertices.push(new THREE.Vector3(size, 0, 0))
    vector.vertices.push(new THREE.Vector3(-size, 0, 0))
    return vector

  } else if (type == "y") {

    vector.vertices.push(new THREE.Vector3(0, size, 0))
    vector.vertices.push(new THREE.Vector3(0, -size, 0))
    return vector

  } else if (type == "z") {

    vector.vertices.push(new THREE.Vector3(0, 0, size))
    vector.vertices.push(new THREE.Vector3(0, 0, -size))
    return vector

  } else {

    return None

  }

}

function new_line(line) {

  vector = new_vector(line["type"], line["size"])
  line = new THREE.Line(vector, new_line_material())
  return line

}

function new_axis(axis) {

  axis = new_line(axis)
  return axis

}

function new_axes(scene, x=100, y=100, z=100) {

  scene.add(new_axis({"type": "x", "size": x}))
  scene.add(new_axis({"type": "y", "size": y}))
  scene.add(new_axis({"type": "z", "size": z}))

}
