<script setup>
import { computed, ref } from 'vue'
import { defaultTentacleData, tentacleObjectData} from './tentacle/data';
import Tentacle from './Tentacle.vue'
const tentacleRef = ref(null)
const btnListRef = ref([])
const currentIndexRef = ref()
const currentTentacle = computed(() => {
  let result
  if (!isNaN(currentIndexRef.value)) {
    result = tentacleObjectData[currentIndexRef.value]
  } else {
    result = defaultTentacleData
  }
  return result
})
function handleClick (index) {
  if (index === currentIndexRef.value) return
  const currentData = currentTentacle.value
  const nextData = tentacleObjectData[index]
  const dom = btnListRef.value[index]
  if (tentacleRef.value.handleActive(currentData, nextData, dom)) {
    currentIndexRef.value = index
  }
}
</script>

<template>
  <div class="tentacle">
    <div class="btns">
      <template v-for="(item, index) in tentacleObjectData" :key="index">
        <div class="btn" @click="handleClick(index)" ref="btnListRef">
          <!-- <iframe src="/tentacle/index.html" style="width: 100%; height: 100%;position: absolute;border: none;filter: blur(2px);"></iframe> -->
          <div :class="{active: currentIndexRef === index}">
            <span>name {{ index }}</span>
          </div>
        </div>
      </template>
    </div>
    <Tentacle ref="tentacleRef" class="tentacle-main"></Tentacle>
  </div>
</template>

<style scoped>
.btns {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
}
.btn {
  width: 100px;
  height: 100px;
  position: relative;
  margin-bottom: 10px;
  cursor: pointer;
}
.btn > div {
  position: absolute;
  color: white;
  background-color: rgba(0, 0, 0, 0.4);
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn > div.active {
  background-color: rgba(255, 255, 255, 0.4);
  color: #333;
}
.tentacle-main {
  overflow: hidden;
  width: 100vw;
  height: 100vh;
  position: absolute;
  border: none;
  pointer-events: none;
}
.tentacle {
  overflow: hidden;
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
