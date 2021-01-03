export function addFlyControls() {

  let camera = data.plot.core.camera
  let position = camera.position
  let target = camera.target

  $(document).keydown(function(event) {

    let deltaX = Math.abs(position.x - target.x)
    let deltaY = Math.abs(position.y - target.y)
    let deltaZ = Math.abs(position.z - target.z)

    let radius3 = position.distanceTo(target)
    let radius2 = side4sides(deltaZ, null, radius3)

    let horizontalAngle = angle4sides(radius2, deltaX)
    if (position.x < target.x) { horizontalAngle = 180 - horizontalAngle }
    if (position.y < target.y) { horizontalAngle = -horizontalAngle }

    let verticalAngle = angle4sides(radius3, deltaZ)
    if (position.z < target.z) { verticalAngle = 180 - verticalAngle }

    if (event.keyCode == 87) { // W

      let newVerticalAngle = verticalAngle + 1
      if (newVerticalAngle <= 0) { newVerticalAngle = 0.000001 } else if (newVerticalAngle >= 180) { newVerticalAngle = -180 - 0.000001 }

      target.z = position.z - side4angle(newVerticalAngle, radius3, true, null)

      radius2 = side4sides(Math.abs(position.z - target.z), null, radius3)

      target.x = position.x - side4angle(horizontalAngle, radius2, true, null)
      target.y = position.y - side4angle(horizontalAngle, radius2, null, true)

    } else if (event.keyCode == 83) { // S

      let newVerticalAngle = verticalAngle - 1
      if (newVerticalAngle <= 0) { newVerticalAngle = 0.000001 } else if (newVerticalAngle >= 180) { newVerticalAngle = -180 - 0.000001 }

      target.z = position.z - side4angle(newVerticalAngle, radius3, true, null)

      radius2 = side4sides(Math.abs(position.z - target.z), null, radius3)

      target.x = position.x - side4angle(horizontalAngle, radius2, true, null)
      target.y = position.y - side4angle(horizontalAngle, radius2, null, true)

    } else if (event.keyCode == 65) { // A

      let newHorizontalAngle = horizontalAngle + 1
      if (newHorizontalAngle >= 180) { newHorizontalAngle = newHorizontalAngle - 360 }

      target.x = position.x - side4angle(newHorizontalAngle, radius2, true, null)
      target.y = position.y - side4angle(newHorizontalAngle, radius2, null, true)

    } else if (event.keyCode == 68) { // D

      let newHorizontalAngle = horizontalAngle - 1
      if (newHorizontalAngle >= 180) { newHorizontalAngle = newHorizontalAngle - 360 }

      target.x = position.x - side4angle(newHorizontalAngle, radius2, true, null)
      target.y = position.y - side4angle(newHorizontalAngle, radius2, null, true)

    }

    camera.lookAt(target.x, target.y, target.z)

    if (event.keyCode == 38) { // Up

    } else if (event.keyCode == 40) { // Down

    } else if (event.keyCode == 37) { // Left

    } else if (event.keyCode == 39) { // Right

    }

  })

}
