export function addFlyControls(flySpeed=1, spinSpeed=1) {

  $(document).keydown(function(event) {

    let camera = data.plot.core.camera
    let position = camera.position
    let target = camera.target

    let deltaX = Math.abs(position.x - target.x)
    let deltaY = Math.abs(position.y - target.y)
    let deltaZ = Math.abs(position.z - target.z)

    let radius3 = position.distanceTo(target)
    let radius2 = side4sides(deltaY, null, radius3)

    let horizontalAngle = angle4sides(radius2, deltaZ)
    if (position.z < target.z) { horizontalAngle = 180 - horizontalAngle }
    if (position.x < target.x) { horizontalAngle = -horizontalAngle }

    let verticalAngle = angle4sides(radius3, deltaY)
    if (position.y < target.y) { verticalAngle = 180 - verticalAngle }

    if (event.keyCode == 38) { // Up

      let inverter = -1
      if (verticalAngle > 90) { verticalAngle = 180 - verticalAngle; inverter = -inverter }

      let radius2 = side4angle(verticalAngle, flySpeed, true, null)

      let stepX = side4angle(horizontalAngle, radius2, null, true) * inverter
      let stepY = side4angle(verticalAngle, flySpeed, null, true)
      let stepZ = side4angle(horizontalAngle, radius2, true, null) * inverter

      position.x += stepX
      position.y += stepY
      position.z += stepZ

      target.x += stepX
      target.y += stepY
      target.z += stepZ

    } else if (event.keyCode == 40) { // Down

      let inverter = -1
      if (verticalAngle > 90) { verticalAngle = 180 - verticalAngle; inverter = -inverter }

      let radius2 = side4angle(verticalAngle, flySpeed, true, null)

      let stepX = side4angle(horizontalAngle, radius2, null, true) * inverter
      let stepY = side4angle(verticalAngle, flySpeed, null, true)
      let stepZ = side4angle(horizontalAngle, radius2, true, null) * inverter

      position.x -= stepX
      position.y -= stepY
      position.z -= stepZ

      target.x -= stepX
      target.y -= stepY
      target.z -= stepZ

    } else if (event.keyCode == 37) { // Left

      let newHorizontalAngle = horizontalAngle + 90
      if (newHorizontalAngle >= 180) { newHorizontalAngle = newHorizontalAngle - 360 }

      let stepX = side4angle(newHorizontalAngle, flySpeed, null, true)
      let stepZ = side4angle(newHorizontalAngle, flySpeed, true, null)

      position.x -= stepX
      position.z -= stepZ

      target.x -= stepX
      target.z -= stepZ

    } else if (event.keyCode == 39) { // Right

      let newHorizontalAngle = horizontalAngle + 90
      if (newHorizontalAngle >= 180) { newHorizontalAngle = newHorizontalAngle - 360 }

      let stepX = side4angle(newHorizontalAngle, flySpeed, null, true)
      let stepZ = side4angle(newHorizontalAngle, flySpeed, true, null)

      position.x += stepX
      position.z += stepZ

      target.x += stepX
      target.z += stepZ

    }

    if (event.keyCode == 87) { // W

      let newVerticalAngle = verticalAngle + spinSpeed
      if (newVerticalAngle <= 0) { newVerticalAngle = 0.000001 } else if (newVerticalAngle >= 180) { newVerticalAngle = -180 - 0.000001 }

      target.y = position.y - side4angle(newVerticalAngle, radius3, true, null)

      radius2 = side4sides(Math.abs(position.y - target.y), null, radius3)

      target.x = position.x - side4angle(horizontalAngle, radius2, null, true)
      target.z = position.z - side4angle(horizontalAngle, radius2, true, null)

    } else if (event.keyCode == 83) { // S

      let newVerticalAngle = verticalAngle - spinSpeed
      if (newVerticalAngle <= 0) { newVerticalAngle = 0.000001 } else if (newVerticalAngle >= 180) { newVerticalAngle = -180 - 0.000001 }

      target.y = position.y - side4angle(newVerticalAngle, radius3, true, null)

      radius2 = side4sides(Math.abs(position.y - target.y), null, radius3)

      target.x = position.x - side4angle(horizontalAngle, radius2, null, true)
      target.z = position.z - side4angle(horizontalAngle, radius2, true, null)

    } else if (event.keyCode == 65) { // A

      let newHorizontalAngle = horizontalAngle + spinSpeed
      if (newHorizontalAngle >= 180) { newHorizontalAngle = newHorizontalAngle - 360 }

      target.x = position.x - side4angle(newHorizontalAngle, radius2, null, true)
      target.z = position.z - side4angle(newHorizontalAngle, radius2, true, null)

    } else if (event.keyCode == 68) { // D

      let newHorizontalAngle = horizontalAngle - spinSpeed
      if (newHorizontalAngle >= 180) { newHorizontalAngle = newHorizontalAngle - 360 }

      target.x = position.x - side4angle(newHorizontalAngle, radius2, null, true)
      target.z = position.z - side4angle(newHorizontalAngle, radius2, true, null)

    }

    camera.lookAt(target.x, target.y, target.z)

  })

}