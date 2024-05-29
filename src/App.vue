<script setup>
import { ref } from 'vue'
import { useReceivingInteractions } from './tentacle/useReceivingInteractions';
import { tentacleObjectData} from './tentacle/data';
import Tentacle from './Tentacle.vue'
const tentacleRef = ref(null)
const btnListRef = ref([])
const { handleActive, interactiveIndexRef } = useReceivingInteractions(tentacleRef, btnListRef)
</script>

<template>
  <div class="tentacle">
    <div class="btns">
      <template v-for="(item, index) in tentacleObjectData" :key="index">
        <div 
          class="btn" @mouseenter="handleActive(index)" ref="btnListRef">
          <div :class="{active: index === interactiveIndexRef}">
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
.btn:hover > div,
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
