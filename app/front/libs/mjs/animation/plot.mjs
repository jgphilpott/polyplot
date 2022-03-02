let core = data.plot.core

export function animatePlot() {

  function animate() {

    requestAnimationFrame(animate)

    core.renderer.render(core.scene, core.camera)

  }

  animate()

}