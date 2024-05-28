<script setup>
import { onUnmounted, ref, watch } from 'vue'
import { useTimeout } from '@vueuse/core'
import { cerateMainTentacle, getMainTentacle, destructionMainTentacle, cerateSmallTentacle, destructionSmallTentacle, getSmallTentacle } from './tentacle'
import { unityToValueMaterial, valueToUnityRotation, valueToUnityScale} from './tentacle/data';
import { getAbsolutePosition, getElementSize } from './tentacle/small.js'
import { BatchTween } from './tentacle/motion';
const tentacleRef = ref(null)
const batchTween =  new BatchTween(function (currentData) {
  const tentacle = getMainTentacle()
  sendUnity(tentacle, currentData)
})

const batchTweenSmall =  new BatchTween(function (currentData) {
  const tentacle = getSmallTentacle()
  sendUnity(tentacle, currentData)
})
const { ready: hasLoadCompleteRef, start: timeStart } = useTimeout(3000, { controls: true })
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
  const result = mainTentacle && hasLoadCompleteRef.value
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
  const {
    top, 
    left
  } = getAbsolutePosition(dom)
  const {
    width, 
    height
  } = getElementSize(dom)
  iframe.style.top = top + 'px'
  iframe.style.left = left + 'px'
  iframe.style.width = width + 'px'
  iframe.style.height = height + 'px'
  iframe.style.opacity = 1
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
