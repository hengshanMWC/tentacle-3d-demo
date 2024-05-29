import { computed, ref, watchEffect } from 'vue'
import { defaultTentacleData, tentacleObjectData} from './data';
export function useReceivingInteractions (tentacleRef, btnListRef) {
  const interactiveIndexRef = ref()
  const currentIndexRef = ref()
  const indexStopRef = ref()
  const currentTentacle = computed(() => {
    let result
    if (!isNaN(currentIndexRef.value)) {
      result = tentacleObjectData[currentIndexRef.value]
    } else {
      result = defaultTentacleData
    }
    return result
  })
  function stopTentacleWatchIndex () {
    if (typeof indexStopRef.value === 'function') {
      indexStopRef.value()
      indexStopRef.value = null
    }
  }
  function tentacleWatchIndex (index) {
    console.log('tentacleWatchIndex')
    if (isNaN(index)) return
    stopTentacleWatchIndex()
    indexStopRef.value = watchEffect(() => {
      if (tentacleRef.value.hasLoadCompleteRef) {
        stopTentacleWatchIndex()
        handleActive(index)
      }
    })
  }
  function handleActive (index) {
    if (index === currentIndexRef.value) return
    const currentData = currentTentacle.value
    const nextData = tentacleObjectData[index]
    const dom = btnListRef.value[index]
    interactiveIndexRef.value = index
    if (!tentacleRef.value.handleActive(currentData, nextData, dom)) {
      tentacleWatchIndex(index)
    } else {
      currentIndexRef.value = index
    }
  }
  return {
    interactiveIndexRef,
    handleActive
  }
}