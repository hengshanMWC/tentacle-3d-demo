<script setup>
import { onUnmounted, ref } from 'vue'
import { cerateMainTentacle, getMainTentacle, destructionMainTentacle } from './tentacle'
import { tentacleObjectData, unityToValueMaterial, valueToUnityRotation, valueToUnityScale } from './tentacle/data';
const tentacleRef = ref(null)
const hasLoadCompleteRef = ref(false)
const currentIndexRef = ref(3)
window.tentacleRef = tentacleRef
function handleClick (index) {
  currentIndexRef.value = index
  
  const mainTentacle = getMainTentacle()
  if (mainTentacle) {
    const data = tentacleObjectData[index]
    mainTentacle.sendUnity('ChangeRotation', valueToUnityRotation(data.rotation))
    mainTentacle.sendUnity('ChangeScale', valueToUnityScale(data.scale))
    mainTentacle.sendUnity('ChangeModelMaterial', unityToValueMaterial(data.material))
  }
}
function handleLoadComplete (data) {
  hasLoadCompleteRef.value = true
  console.log('handleLoadComplete', data)
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
})
</script>

<template>
  <div class="tentacle">
    <div class="btns">
      <template v-for="(item, index) in tentacleObjectData" :key="index">
        <div class="btn" @click="handleClick(index)">
          <div>
            <span>name {{ index }}</span>
          </div>
        </div>
      </template>
    </div>
    <iframe ref="tentacleRef" @load="handleIframeLoad" src="/tentacle/index.html" class="tentacle-main"></iframe>
  </div>
</template>

<style scoped>
.btns {
  position: absolute;
  top: 0;
  left: 0;
}
.btn {
  width: 80px;
  height: 30px;
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
}
.btn > div {
  background-color: rgba(255, 255, 255, 0.8);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.tentacle-main {
  width: 100vw;
  height: 100vh;
  position: absolute;
  border: none;
  pointer-events: none;
}
.tentacle {
  height: 100vh;
  width: 100vw;
  background: radial-gradient(
    76.58% 296.9% at 50% 50%,
    #353535c4 0%,
    #353535c4 6.23%,
    #0d0c0cc4 96.19%,
    #0d0c0cc4 100%
  );
}
</style>
