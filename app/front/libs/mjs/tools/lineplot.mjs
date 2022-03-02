let plot = data.plot

export function getVertices(line) {

  if (data.client.settings.general.countryExceptions.includes(line.code) != true) {

    let vertices = (plot.type != "Indicator") ? (line.x) : (line.history)

    return vertices.filter(function(vertex) {

      if (typeof(vertex.year) == "number" && typeof(vertex.value) == "number" && vertex.year >= plot.t.minCap && vertex.year <= plot.t.maxCap) {

        plot.line.xRegVals.push(vertex.year)
        plot.line.yRegVals.push(vertex.value)

        return vertex

      }

    })

  }

}

export function newRegression(order) {

  let vertices = []
  let coefficients = [].concat.apply([], polyfit(plot.line.xRegVals, plot.line.yRegVals, parseInt(order)))

  plot.line.regression = coefficients

  for (let i = plot.t.minCap; i <= plot.t.maxCap; i++) {

    vertices.push({"year": i, "value": predict(i, coefficients)})

  }

  return vertices

}

export function newTangent(x=plot.t.year, regression=plot.line.regression) {

  let vertices = []
  let coefficients = findTangent(x, regression)

  plot.line.tangent = coefficients

  for (let i = plot.t.minCap; i <= plot.t.maxCap; i++) {

    vertices.push({"year": i, "value": predict(i, coefficients)})

  }

  return vertices

}