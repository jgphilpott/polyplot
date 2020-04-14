export function addTitlePanel() {

  $("body").append("<div id='title' class='panel'></div>")
  $("#title.panel").append("<h1 id='name'>" + data.plot.title + "</h1>")

}
