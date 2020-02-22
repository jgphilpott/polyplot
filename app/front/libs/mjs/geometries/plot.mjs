import {black} from "../colors/three/grayscale.mjs"
import {xEvent} from "../core/events.mjs"
import {newSphere} from "./sphere.mjs"
import {regionsColourSwitch} from "../colors/switches/regions.mjs"
import {metaUpdate, metaClear} from "../../../libs/mjs/panels/meta.mjs"

export function addPlot(r=1, x=0, y=0, z=0, color=black, code=null) {

  let plot = newSphere(r, x, y, z, regionsColourSwitch(color))
  xEvent(plot, "mouseover", metaUpdate, code)
  xEvent(plot, "mouseout", metaClear)
  data.plot.core.scene.add(plot)
  return plot

}
