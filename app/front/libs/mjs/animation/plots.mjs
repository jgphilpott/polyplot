import {addPlot} from "../geometries/plot.mjs"

export function animatePlot(plot, direction="forward", speed=1200) {

  let rNew = plot.r.find(item => item.year == data.plot.time.year).value
  let xNew = plot.x.find(item => item.year == data.plot.time.year).value
  let yNew = plot.y.find(item => item.year == data.plot.time.year).value
  let zNew = plot.z.find(item => item.year == data.plot.time.year).value

  if (typeof(rNew) == "number" && typeof(xNew) == "number" && typeof(yNew) == "number" && typeof(zNew) == "number") {

    rNew = data.plot.r.scale(rNew)
    xNew = data.plot.x.scale(xNew)
    yNew = data.plot.y.scale(yNew)
    zNew = data.plot.z.scale(zNew)

    if (plot.object != null) {

      let rNow = plot.object.geometry.parameters.radius * plot.object.scale.x
      let xNow = plot.object.position.x
      let yNow = plot.object.position.y
      let zNow = plot.object.position.z

      let rDiff = rNew / rNow
      let xDiff = xNew - xNow
      let yDiff = yNew - yNow
      let zDiff = zNew - zNow

      let steps = speed / data.plot.core.frameRate

      var rStep

      if (rDiff > 1) {

        rStep = (rDiff - 1) / steps

      } else if (rDiff < 1) {

        rStep = (1 - rDiff) / steps

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

      let stepInterval = setInterval(updatePlot, data.plot.core.frameRate)

      function stopInterval() {

        clearInterval(stepInterval)

      }

      setTimeout(stopInterval, speed)

    } else if (plot.object == null) {

      function updatePlot() {

        plot.object = addPlot(rNew, xNew, yNew, zNew, plot.region, plot.code)

      }

      setTimeout(updatePlot, speed)

    }

  } else if (plot.object != null) {

    data.plot.core.scene.remove(plot.object)
    plot.object = null

  }

}

export function animatePlots(plots=data.plot.plots, direction="forward", speed=1200) {

  if (direction == "forward" && data.plot.time.year < data.plot.time.yearMax) {

    data.plot.time.year += 1

  } else if (direction == "backward" && data.plot.time.year > data.plot.time.yearMin) {

    data.plot.time.year -= 1

  }

  for (let i = 0; i < plots.length; i++) {

    setTimeout(animatePlot(plots[i], direction, speed), 0)

  }

}
