function new_line_material(color=black, width=1) {

  return new THREE.LineBasicMaterial({color: color, linewidth: width})

}

function new_mesh_material(color=black) {

  return new THREE.MeshStandardMaterial({color: color})

}
