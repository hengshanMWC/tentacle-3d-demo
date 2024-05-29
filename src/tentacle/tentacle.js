import { EventEmitter } from 'eventemitter3'

export class TentacleIframe extends EventEmitter {
  constructor (iframe) {
    super()
    this.iframe = iframe
    this._onMessage = this.onMessage.bind(this)
    window.addEventListener('message', this._onMessage)
  }
  get content () {
    return this.iframe?.contentWindow
  }
  get tentacleConstant () {
    return this.content?.tentacle
  }
  get unity () {
    return this.content.unityInstance
  }
  getMessageType (type) {
    return this.tentacleConstant.prefix + type
  }
  sendUnity (methodName, value) {
    // console.log('methodName, value', methodName, value)
    if (this.unity) {
      this.unity.SendMessage('ModelControl', methodName, value)
    }
  }
  send (type, data, targetOrigin = '*') {
    const message = {
      id: this.tentacleConstant.id,
      type: this.getMessageType(type),
      data
    }
    content.postMessage(message, targetOrigin)
  }
  onMessage (data) {
    const detail = data.data
    // if (detail?.id) {
    //   console.log('onMessage', detail, this.tentacleConstant?.id, this.tentacleConstant?.prefix)
    // }
    if (
      detail?.id &&
      detail?.type &&
      this.tentacleConstant?.prefix &&
      detail.id === this.tentacleConstant?.id &&
      detail.type.includes(this.tentacleConstant?.prefix)
    ) {
      this.emit(detail.type, detail.data)
    }
  }
  destruction () {
    window.removeEventListener('message', this._onMessage)
    if (this.unity) {
      this.unity.Quit()
    } 
  }
}