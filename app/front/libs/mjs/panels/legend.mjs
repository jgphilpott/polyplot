export function addLegendPanel() {

  let panel = $(".panel#legend")

  $("#legend #r-data").text(data.plot.r.name)
  $("#legend #x-data").text(data.plot.x.name)
  $("#legend #y-data").text(data.plot.y.name)
  $("#legend #z-data").text(data.plot.z.name)

}
