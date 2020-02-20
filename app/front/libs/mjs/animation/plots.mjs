import {white} from "../colors/three/grayscale.mjs"
import {rScale, xScale, yScale, zScale} from "../scales/axes.mjs"

export function animatePlot(dom, plot, year=data.plot.year, direction="forward", speed=1200) {

if (plot.object != null) {

  let rNow = plot.object.geometry.parameters.radius
  let xNow = plot.object.position.x
  let yNow = plot.object.position.y
  let zNow = plot.object.position.z

  // console.log(plot, data.plot.year);

  let rNew = plot["r"].find(item => item.year == data.plot.year).value
  let xNew = plot["x"].find(item => item.year == data.plot.year).value
  let yNew = plot["y"].find(item => item.year == data.plot.year).value
  let zNew = plot["z"].find(item => item.year == data.plot.year).value

if (rNew != null && xNew != null && yNew != null && zNew != null) {

  rNew = rScale(rNew)
  xNew = xScale(xNew)
  yNew = yScale(yNew)
  zNew = zScale(zNew)

  let rDiff = rNew / rNow
  let xDiff = xNew - xNow
  let yDiff = yNew - yNow
  let zDiff = zNew - zNow

  let steps = speed / 60

  let rStep = null

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

  let stepInterval = setInterval(function(){

    updatePlot()

  }, 60)

  function stopInterval() {

    clearInterval(stepInterval)

  }

  setTimeout(stopInterval, speed)

}

}

}

export function animatePlots(dom, plots=data.plot.plots, year=data.plot.year, direction="forward", speed=1200) {

  data.plot.year += 1

  for (let i = 0; i < plots.length; i++) {

    animatePlot(dom, plots[i], year, direction, 1200)

  }

}
