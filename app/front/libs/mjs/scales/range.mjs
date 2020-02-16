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

export function rangeAxis(axis, values=[]) {

  let plots = data.plot.plots

  for (let i = 0; i < plots.length; i++) {

    for (let j = 0; j < plots[i][axis].length; j++) {

      if (typeof(plots[i][axis][j]["value"]) == "number") {

        values.push(plots[i][axis][j]["value"])

      }

    }

  }

  return [minValue(values), maxValue(values)]

}
