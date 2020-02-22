export function animatePlot() {

  let plot = data.plot.core

  function animate() {

    requestAnimationFrame(animate)

    plot.controls.update()

    plot.renderer.render(plot.scene, plot.camera)

  }

  animate()

}
