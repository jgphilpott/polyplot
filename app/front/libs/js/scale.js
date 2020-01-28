function scale_value(value, from_range, to_range) {

  return ((value - from_range[0]) / (from_range[1] - from_range[0])) * (to_range[1] - to_range[0]) + to_range[0]

}

function axis_abs_value(axis, value) {

  vals = []

  for (var i = 0; i < data.length; i++) {
    for (var j = 0; j < data[i][axis].length; j++) {

      if (typeof(data[i][axis][j]["value"]) == "number") {
        vals.push(data[i][axis][j]["value"])
      }

    }
  }

  if (value == "max") {
    return Math.max.apply(null, vals.map(Math.abs))
  } else if (value == "min") {
    return Math.min.apply(null, vals.map(Math.abs))
  } else {
    return None
  }

}
