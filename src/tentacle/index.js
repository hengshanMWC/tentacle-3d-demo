import { TentacleIframe } from "./tentacle"

let mainTentacle

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