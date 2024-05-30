import { onBeforeUnmount, ref, watch } from 'vue'
import { useTimeoutFn } from '@vueuse/core'
import { cerateMainTentacle, getMainTentacle, destructionMainTentacle, cerateSmallTentacle, destructionSmallTentacle, getSmallTentacle } from './index'
import { unityToValueMaterial, valueToUnityRotation, valueToUnityScale} from './data';
import { setDomShow } from './small.js'
import { BatchTween } from './motion'
import { animationPosition } from './animation'

export function useTentacle (tentacleRef) {
  const hasLoadCompleteRef = ref(false)
  let requestAnimationFrameId 
  const {data: positionData, tl: positionDataTl} = animationPosition()
  const batchTween =  new BatchTween(function (currentData) {
    const tentacle = getMainTentacle()
    sendUnity(tentacle, currentData)
  })

  // const batchTweenSmall =  new BatchTween(function (currentData) {
  //   const tentacle = getSmallTentacle()
  //   sendUnity(tentacle, currentData)
  // })
  const { start: timeStart } = useTimeoutFn(() => {
    hasLoadCompleteRef.value = true
  }, 4000, { immediate: false })
  watch(hasLoadCompleteRef, (load) => {
    stopTentacle()
    if (load) {
      initTentacle()
      updateTentacle()
      positionDataTl?.play()
    }
  })
  function initTentacle () {
    const data = [
      {
        fnName: 'ChangeCenterRotateSpeed',
        value: '0.5'
      }
    ]
    setAllTentacle(data)
  } 
  function updateTentaclePosition () {
    const mainTentacle = getMainTentacle()
    // window.mainTentacle = mainTentacle
    mainTentacle.sendUnity('ChangePos', valueToUnityRotation(positionData))
    // console.log('data', data)
  }
  function updateTentacle () {
    updateTentaclePosition()
    requestAnimationFrameId = requestAnimationFrame(updateTentacle)
  }
  function stopTentacle () {
    cancelAnimationFrame(requestAnimationFrameId)
  }
  function setAllTentacle (data) {
    const mainTentacle = getMainTentacle()
    const smallTentacle = getSmallTentacle()
    data.forEach(item => {
      mainTentacle.sendUnity(item.fnName, item.value)
      smallTentacle.sendUnity(item.fnName, item.value)
    })
  }
  function handleLoadComplete (data) {
    const mainTentacle = getMainTentacle()
    if (data.status === mainTentacle.tentacleConstant.eventStatus.success) {
      timeStart()
    }
    console.log('handleLoadComplete', data)
  }
  function handleProgress (progress) {
    console.log('progress', progress)
  }
  // const stopLoadComplete = watch(hasLoadCompleteRef, (value) => {
  //   if (value) {
  //     stopLoadComplete()
  //     console.log('stopLoadComplete', value)
  //   }
  // })
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
    console.log('result', result)
    if (result) {
      batchTween.start(currentData, nextData)
      // batchTweenSmall.start(currentData, nextData)
      sendUnity(getSmallTentacle(), nextData)
      setSmallIframePosition(dom)
    }
    return result
  }
  function setSmallIframePosition (dom) {
    const iframe = getSmallTentacle().iframe
    setDomShow(iframe.parentElement, dom)
  }
  function getTentacleEvent (name = 'loadComplete') {
    const mainTentacle = getMainTentacle()
    if (mainTentacle) {
      return mainTentacle.getMessageType(mainTentacle.tentacleConstant.event[name])
    }
  }
  function offPropress () {
    getMainTentacle()?.off?.(getTentacleEvent('progress'), handleProgress)
  }
  function offLoadComplete () {
    getMainTentacle()?.off?.(getTentacleEvent(), handleLoadComplete)
  }
  function handleIframeLoad () {
    offPropress()
    offLoadComplete()
    destructionMainTentacle()
    cerateMainTentacle(tentacleRef.value)
    getMainTentacle().on(getTentacleEvent(), handleLoadComplete)
    getMainTentacle().on(getTentacleEvent('progress'), offPropress)
  }
  // 创建小触手
  cerateSmallTentacle()
  onBeforeUnmount(() => {
    positionDataTl?.kill()
    offPropress()
    offLoadComplete()
    batchTween.destruction()
    stopTentacle()
    destructionMainTentacle()
    destructionSmallTentacle()
  })
  return {
    hasLoadCompleteRef,
    handleActive,
    handleIframeLoad,
  }
}