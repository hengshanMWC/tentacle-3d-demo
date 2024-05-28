<script setup>
import { onUnmounted, ref } from 'vue'
import { cerateMainTentacle, getMainTentacle, destructionMainTentacle } from './tentacle'
import { unityToValueMaterial, valueToUnityRotation, valueToUnityScale} from './tentacle/data';
import { BatchTween } from './tentacle/motion';
const tentacleRef = ref(null)
const hasLoadCompleteRef = ref(false)
const batchTween =  new BatchTween(function (currentData) {
  const mainTentacle = getMainTentacle()
  if (mainTentacle) {
    mainTentacle.sendUnity('ChangeRotation', valueToUnityRotation(currentData.rotation))
    mainTentacle.sendUnity('ChangeScale', valueToUnityScale(currentData.scale))
    mainTentacle.sendUnity('ChangeModelMaterial', unityToValueMaterial(currentData.material))
  }
})

function handleLoadComplete (data) {
  hasLoadCompleteRef.value = true
  console.log('handleLoadComplete', data)
}
function handleActive (currentData, nextData) {
  const mainTentacle = getMainTentacle()
  const result = mainTentacle && hasLoadCompleteRef.value
  if (result) {
    batchTween.start(currentData, nextData)
  }
  return result
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
onUnmounted(() => {
  getMainTentacle()?.off?.(getEventLoadComplete(), handleLoadComplete)
  destructionMainTentacle()
  batchTween.destruction()
})
defineExpose({
  hasLoadCompleteRef,
  handleActive
})
</script>

<template>
  <iframe ref="tentacleRef" @load="handleIframeLoad" src="/tentacle/index.html"></iframe>
</template>
