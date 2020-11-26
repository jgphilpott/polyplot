import {addOrbitControls} from "./orbit.mjs"

export function addControls() {

  let controls = addOrbitControls()

  return controls

}

// $(document).keypress(function(event) {
//
//   if (event.keyCode == 119) { // W
//
//     camera.target.z += 1
//     camera.lookAt(camera.target.x, camera.target.y, camera.target.z)
//
//   } else if (event.keyCode == 115) { // S
//
//     camera.target.z -= 1
//     camera.lookAt(camera.target.x, camera.target.y, camera.target.z)
//
//   } else if (event.keyCode == 97) { // A
//
//   } else if (event.keyCode == 100) { // D
//
//   }
//
// })
