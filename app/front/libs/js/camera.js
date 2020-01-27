function new_camera(width, height, fov=75, near=1, far=1000, x=100, y=100, z=100,) {

  camera = new THREE.PerspectiveCamera(fov, width / height, near, far)

  camera.position.x = x
  camera.position.y = y
  camera.position.z = z

  return camera

}
