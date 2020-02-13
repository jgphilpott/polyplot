export function newVector(vertices=[]) {

  let vector = new THREE.Geometry()

  for (var i = 0; i < vertices.length; i++) {

    vector.vertices.push(new THREE.Vector3(vertices[i][0], vertices[i][1], vertices[i][2]))

  }

  return vector

}
