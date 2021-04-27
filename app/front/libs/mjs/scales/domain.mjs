let plot = data.plot

export function findDomain(axis, plots=plot.plots) {

  let domain = []

  for (let i = 0; i < plots.length; i++) {

    if (data.client.settings.general.countryExceptions.includes(plots[i].code) != true) {

      for (let j = 0; j < plots[i][axis].length; j++) {

        let year = plots[i][axis][j].year
        let value = plots[i][axis][j].value

        if (typeof(value) == "number" && year >= plot.t.minCap && year <= plot.t.maxCap) {
          domain.push(value)
        }

      }

    }

  }

  return [minValue(domain), maxValue(domain)]

}
