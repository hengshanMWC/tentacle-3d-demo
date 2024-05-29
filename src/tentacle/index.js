import { createIframe } from "./small"
import { TentacleIframe } from "./tentacle"

let mainTentacle, smallTentacle

export function cerateMainTentacle (iframe) {
  destructionMainTentacle()
  mainTentacle = new TentacleIframe(iframe)
}

export function getMainTentacle () {
  return mainTentacle
}

export function destructionMainTentacle () {
  if (mainTentacle) {
    mainTentacle.destruction()
    mainTentacle = null
  }
}

export function cerateSmallTentacle () {
  destructionSmallTentacle()
  const iframe = createIframe()
  smallTentacle = new TentacleIframe(iframe)

}

export function getSmallTentacle () {
  return smallTentacle
}

export function destructionSmallTentacle () {
  if (smallTentacle) {
    smallTentacle.destruction()
    smallTentacle.iframe.remove()
    smallTentacle = null
  }
}