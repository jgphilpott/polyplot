export function newCanvas() {

  let canvas = document.body.appendChild(data.plot.core.renderer.domElement)

  canvas.setAttribute("id", "canvas")

  return canvas

}
