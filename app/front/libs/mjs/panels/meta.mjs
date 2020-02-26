export function addMetaPanel() {

}

export function updateMetaPanel(code) {

  let plot = data.plot.plots.find(item => item.code == code)

  let r = plot.r.find(item => item.year == data.plot.time.year).value
  let x = plot.x.find(item => item.year == data.plot.time.year).value
  let y = plot.y.find(item => item.year == data.plot.time.year).value
  let z = plot.z.find(item => item.year == data.plot.time.year).value

  $("#meta #name").text(plot.name)

  $("#meta #flag").attr("src", "/front/imgs/flags/" + code + ".png")

  $("#meta #region").text(plot.region)

  $("#meta #r-data").text(r)
  $("#meta #x-data").text(x)
  $("#meta #y-data").text(y)
  $("#meta #z-data").text(z)

}

export function clearMetaPanel() {

  $("#meta #name").text("Meta")

  $("#meta #flag").attr("src", "/front/imgs/flags/None.png")

  $("#meta #region").text("None")

  $("#meta #r-data").text("None")
  $("#meta #x-data").text("None")
  $("#meta #y-data").text("None")
  $("#meta #z-data").text("None")

}
