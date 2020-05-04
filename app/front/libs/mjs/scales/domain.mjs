let plot = data.plot
let plots = plot.plots

export function findDomain(axis) {

  let domain = []

  for (let i = 0; i < plots.length; i++) {

    for (let j = 0; j < plots[i][axis].length; j++) {

      let year = plots[i][axis][j].year

      if (year >= plot.t.minCap && year <= plot.t.maxCap) {

        if (typeof(plots[i][axis][j].value) == "number") {

          domain.push(plots[i][axis][j].value)

        }

      }

    }

  }

  return [minValue(domain), maxValue(domain)]

}
