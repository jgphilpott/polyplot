import {white} from "../colors/three/grayscale.mjs"
import {rScale, xScale, yScale, zScale} from "../scales/axes.mjs"

export function animatePlot(dom, plot, year=data.plot.year, direction="forward", speed=1200) {

  // console.log(plot)

  let r = plot.object.geometry.parameters.radius
  let x = plot.object.position.x
  let y = plot.object.position.y
  let z = plot.object.position.z

  data.plot.year += 1

  let rNew = plot["r"].find(item => item.year == data.plot.year).value
  let xNew = plot["x"].find(item => item.year == data.plot.year).value
  let yNew = plot["y"].find(item => item.year == data.plot.year).value
  let zNew = plot["z"].find(item => item.year == data.plot.year).value

  rNew = rScale(rNew)
  xNew = xScale(xNew)
  yNew = yScale(yNew)
  zNew = zScale(zNew)

  let rDif = Math.abs(r - rNew)
  let xDif = Math.abs(x - xNew)
  let yDif = Math.abs(y - yNew)
  let zDif = Math.abs(z - zNew)

  let steps = speed / 42

  let rStep = rDif / steps
  let xStep = xDif / steps
  let yStep = yDif / steps
  let zStep = zDif / steps

  function updatePlot() {

    plot.object.geometry.parameters.radius += rStep
    plot.object.position.x += xStep
    plot.object.position.y += yStep
    plot.object.position.z += zStep

  }

  let stepInterval = setInterval(function(){
    updatePlot()
  }, 42)

  function stop() {
    clearInterval(stepInterval)
  }

  setTimeout(stop, speed)

}

export function animatePlots(dom, plots=data.plot.plots, year=data.plot.year, direction="forward", speed=1200) {

  for (let i = 0; i < plots.length; i++) {

    if (plots[i].code == "IND") {

      animatePlot(dom, plots[i], year, direction, speed)

    }

  }

}
