let plot = data.plot
let plots = plot.plots

export function minValue(values=[]) {

  return Math.min.apply(null, values)

}

export function maxValue(values=[]) {

  return Math.max.apply(null, values)

}

export function absMinValue(values=[]) {

  return Math.min.apply(null, values.map(Math.abs))

}

export function absMaxValue(values=[]) {

  return Math.max.apply(null, values.map(Math.abs))

}

export function rangeAxis(axis) {

  let range = []

  for (let i = 0; i < plots.length; i++) {

    for (let j = 0; j < plots[i][axis].length; j++) {

      let year = plots[i][axis][j].year

      if (year >= plot.t.minCap && year <= plot.t.maxCap) {

        if (typeof(plots[i][axis][j].value) == "number") {

          range.push(plots[i][axis][j].value)

        }

      }

    }

  }

  return [minValue(range), maxValue(range)]

}
