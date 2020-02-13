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

  for (let i = 0; i < data.length; i++) {

    for (let j = 0; j < data[i][axis].length; j++) {

      if (typeof(data[i][axis][j]["value"]) == "number") {

        values.push(data[i][axis][j]["value"])

      }

    }

  }

  return [minValue(values), maxValue(values)]

}
