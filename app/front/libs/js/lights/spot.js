function newSpotLight(color=white, intensity=1, x=100, y=100, z=100, xTarget=0, yTarget=0, zTarget=0) {

  light = new THREE.SpotLight(color, intensity)
  light.position.set(x, y, z)
  light.target.position.set(xTarget, yTarget, zTarget)
  return light

}
