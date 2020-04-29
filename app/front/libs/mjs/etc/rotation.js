// Credit: https://gist.github.com/hoandang/5989980
function getRotation(element) {

  let degree = 0

  let matrix = element.css("-webkit-transform") ||
               element.css("-moz-transform")    ||
               element.css("-ms-transform")     ||
               element.css("-o-transform")      ||
               element.css("transform")

  if (matrix !== "none") {

    let values = matrix.split("(")[1].split(")")[0].split(",")

    let a = values[0]
    let b = values[1]

    degree = Math.round(Math.atan2(b, a) * (180 / Math.PI))

  }

  return (degree < 0) ? degree += 360 : degree

}

// Credit: https://stackoverflow.com/a/15191130/1544937
function rotate(element, degree, duration = 1000) {

  let rotation = getRotation(element)

  $({"deg": rotation}).animate({"deg": degree}, {

    "duration": duration,
    "step": function(now) {

      element.css({"transform": "rotate(" + now + "deg)"})

    }

  })

}
