let core = data.plot.core

export function animatePlot() {

  function animate() {

    requestAnimationFrame(animate)

    core.controls.update()

    core.renderer.render(core.scene, core.camera)

  }

  animate()

}
