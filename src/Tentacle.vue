<script setup>
import { onUnmounted, ref, watch } from 'vue'
import { useTimeout } from '@vueuse/core'
import { cerateMainTentacle, getMainTentacle, destructionMainTentacle, cerateSmallTentacle, destructionSmallTentacle, getSmallTentacle } from './tentacle'
import { unityToValueMaterial, valueToUnityRotation, valueToUnityScale} from './tentacle/data';
import { getAbsolutePosition, getElementSize, setDomShow } from './tentacle/small.js'
import { BatchTween } from './tentacle/motion';
const tentacleRef = ref(null)
const batchTween =  new BatchTween(function (currentData) {
  const tentacle = getMainTentacle()
  sendUnity(tentacle, currentData)
})

// const batchTweenSmall =  new BatchTween(function (currentData) {
//   const tentacle = getSmallTentacle()
//   sendUnity(tentacle, currentData)
// })
const { ready: hasLoadCompleteRef, start: timeStart } = useTimeout(4000, { controls: true })
function handleLoadComplete (data) {
  timeStart()
  console.log('handleLoadComplete', data)
}
const stopLoadComplete = watch(hasLoadCompleteRef, (value) => {
  if (value) {
    stopLoadComplete()
  }
})
function sendUnity(tentacle, data) {
  if (tentacle) {
    tentacle.sendUnity('ChangeRotation', valueToUnityRotation(data.rotation))
    tentacle.sendUnity('ChangeScale', valueToUnityScale(data.scale))
    tentacle.sendUnity('ChangeModelMaterial', unityToValueMaterial(data.material))
  }
}
function handleActive (currentData, nextData, dom) {
  const mainTentacle = getMainTentacle()
  const smallTentacle = getSmallTentacle()
  const result = mainTentacle && smallTentacle && hasLoadCompleteRef.value
  if (result) {
    batchTween.start(currentData, nextData)
    // batchTweenSmall.start(currentData, nextData)
    const tentacle = getSmallTentacle()
    tentacle.sendUnity('ChangeRotation', valueToUnityRotation(nextData.rotation))
    tentacle.sendUnity('ChangeScale', valueToUnityScale(nextData.scale))
    tentacle.sendUnity('ChangeModelMaterial', unityToValueMaterial(nextData.material))
    setSmallIframePosition(dom)
  }
  return result
}
function setSmallIframePosition (dom) {
  const iframe = getSmallTentacle().iframe
  setDomShow(iframe.parentElement, dom)
}
function getEventLoadComplete () {
  const mainTentacle = getMainTentacle()
  if (mainTentacle) {
    return mainTentacle.getMessageType(mainTentacle.tentacleConstant.event.loadComplete)
  }
}
function handleIframeLoad () {
  getMainTentacle()?.off?.(getEventLoadComplete(), handleLoadComplete)
  destructionMainTentacle()
  cerateMainTentacle(tentacleRef.value)
  getMainTentacle().on(getEventLoadComplete(), handleLoadComplete)
}
cerateSmallTentacle()
onUnmounted(() => {
  getMainTentacle()?.off?.(getEventLoadComplete(), handleLoadComplete)
  destructionMainTentacle()
  destructionSmallTentacle()
  batchTween.destruction()
})
defineExpose({
  hasLoadCompleteRef,
  handleActive
})
const src = import.meta.env.VITE_IFRAME_PATH
</script>

<template>
  <iframe ref="tentacleRef" @load="handleIframeLoad" :src="src"></iframe>
</template>
