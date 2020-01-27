function new_light(scene, color=white, intensity=1, x=100, y=100, z=100) {

  light = new THREE.PointLight(color, intensity)
  light.position.set(x, y, z)
  scene.add(light)

}
