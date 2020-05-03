import {addPlot} from "../../geometries/plot.mjs"

let plot = data.plot
let plots = plot.plots

export function animateSpheres(duration) {

  for (let i = 0; i < plots.length; i++) {

    let sphere = plots[i].object

    let rNew = plots[i].r.find(item => item.year == plot.t.year).value
    let xNew = plots[i].x.find(item => item.year == plot.t.year).value
    let yNew = plots[i].y.find(item => item.year == plot.t.year).value
    let zNew = plots[i].z.find(item => item.year == plot.t.year).value

    if (sphere && (typeof(rNew) == "number" && typeof(xNew) == "number" && typeof(yNew) == "number" && typeof(zNew) == "number")) {

      let rNow = sphere.geometry.parameters.radius * sphere.scale.x
      let xNow = sphere.position.x
      let yNow = sphere.position.y
      let zNow = sphere.position.z

      rNew = plot.r.scale(rNew)
      xNew = plot.x.scale(xNew)
      yNew = plot.y.scale(yNew)
      zNew = plot.z.scale(zNew)

      let rDiff = (rNew / rNow) - 1
      let xDiff = xNew - xNow
      let yDiff = yNew - yNow
      let zDiff = zNew - zNow

      if (duration) {

        let steps = duration / plot.core.frameRate

        let rStep = rDiff / steps
        let xStep = xDiff / steps
        let yStep = yDiff / steps
        let zStep = zDiff / steps

        function updatePlot() {

          sphere.scale.x += rStep
          sphere.scale.y += rStep
          sphere.scale.z += rStep

          sphere.position.x += xStep
          sphere.position.y += yStep
          sphere.position.z += zStep

        }

        let stepInterval = setInterval(updatePlot, plot.core.frameRate)

        function stopInterval() {

          clearInterval(stepInterval)

        }

        setTimeout(stopInterval, duration)

      } else {

        sphere.scale.x += rDiff
        sphere.scale.y += rDiff
        sphere.scale.z += rDiff

        sphere.position.x += xDiff
        sphere.position.y += yDiff
        sphere.position.z += zDiff

      }

    } else if (sphere && !(typeof(rNew) == "number" && typeof(xNew) == "number" && typeof(yNew) == "number" && typeof(zNew) == "number")) {

      plot.core.scene.remove(sphere)
      plots[i].object = null

    } else if (!sphere && (typeof(rNew) == "number" && typeof(xNew) == "number" && typeof(yNew) == "number" && typeof(zNew) == "number")) {

      // function updatePlot() {
      //
      //   plots[i].object = addPlot(rNew, xNew, yNew, zNew, plots[i].region, plots[i].code)
      //
      // }
      //
      // setTimeout(updatePlot, duration)

    }

  }

}
