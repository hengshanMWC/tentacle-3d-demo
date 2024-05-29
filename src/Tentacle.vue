<script setup>
import { ref } from 'vue'
import {useTentacle } from './tentacle/useTentacle'
const tentacleRef = ref(null)
const {
  hasLoadCompleteRef,
  handleActive,
  handleIframeLoad,
} = useTentacle(tentacleRef)
defineExpose({
  hasLoadCompleteRef,
  handleActive
})
const src = import.meta.env.VITE_TENTACLE_PATH
</script>

<template>
  <iframe ref="tentacleRef" @load="handleIframeLoad" :src="src"></iframe>
</template>
