export function newPerspectiveCamera(width, height, fov=75, near=0.1, far=1000, x=100, y=100, z=100) {

  let camera = new THREE.PerspectiveCamera(fov, width / height, near, far)
  camera.position.set(x, y, z)
  return camera

}
