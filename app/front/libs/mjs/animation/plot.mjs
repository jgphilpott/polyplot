let plot = data.plot

export function animatePlot() {

  let core = plot.core

  function animate() {

    requestAnimationFrame(animate)

    core.controls.update()

    core.renderer.render(core.scene, core.camera)

  }

  animate()

}
