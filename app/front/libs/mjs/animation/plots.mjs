export function animatePlot(plot, year=data.plot.time.year, direction="forward", speed=1200) {

  if (plot.object != null) {

    let rNow = plot.object.geometry.parameters.radius
    let xNow = plot.object.position.x
    let yNow = plot.object.position.y
    let zNow = plot.object.position.z

    let rNew = plot["r"].find(item => item.year == data.plot.time.year).value
    let xNew = plot["x"].find(item => item.year == data.plot.time.year).value
    let yNew = plot["y"].find(item => item.year == data.plot.time.year).value
    let zNew = plot["z"].find(item => item.year == data.plot.time.year).value

    if (rNew != null && xNew != null && yNew != null && zNew != null) {

      rNew = data.plot.r.scale(rNew)
      xNew = data.plot.x.scale(xNew)
      yNew = data.plot.y.scale(yNew)
      zNew = data.plot.z.scale(zNew)

      let rDiff = rNew / rNow
      let xDiff = xNew - xNow
      let yDiff = yNew - yNow
      let zDiff = zNew - zNow

      let steps = speed / data.plot.core.frameRate

      let rStep = null

      if (rDiff > 1) {

        rStep = (rDiff - plot.object.scale.x) / steps

      } else if (rDiff < 1) {

        rStep = (plot.object.scale.x - rDiff) / steps

      }

      let xStep = xDiff / steps
      let yStep = yDiff / steps
      let zStep = zDiff / steps

      function updatePlot() {

        if (rDiff > 1) {

          plot.object.scale.x += rStep
          plot.object.scale.y += rStep
          plot.object.scale.z += rStep

        } else if (rDiff < 1) {

          plot.object.scale.x -= rStep
          plot.object.scale.y -= rStep
          plot.object.scale.z -= rStep

        }

        plot.object.position.x += xStep
        plot.object.position.y += yStep
        plot.object.position.z += zStep

      }

      let stepInterval = setInterval(function(){

        updatePlot()

      }, data.plot.core.frameRate)

      function stopInterval() {

        clearInterval(stepInterval)

      }

      setTimeout(stopInterval, speed)

    } else {

      data.plot.core.scene.remove(plot.object)
      plot.object = null

    }

  }

}

export function animatePlots(plots=data.plot.plots, year=data.plot.time.year, direction="forward", speed=1200) {

  data.plot.time.year += 1

  for (let i = 0; i < plots.length; i++) {

    setTimeout(animatePlot(plots[i], year, direction, speed), 0)

  }

}
