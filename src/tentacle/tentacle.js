import { EventEmitter } from 'eventemitter3'

export class TentacleIframe extends EventEmitter {
  constructor (iframe) {
    super()
    this.iframe = iframe
    this._onMessage = this.onMessage.bind(this)
    window.addEventListener('message', this._onMessage)
  }
  get content () {
    return this.iframe.contentWindow
  }
  get tentacleConstant () {
    console.log('tentacleConstant', this.content)
    return this.content.tentacle
  }
  get unity () {
    return this.content.unityInstance
  }
  getMessageType (type) {
    return this.tentacleConstant.prefix + type
  }
  sendUnity (methodName, value) {
    console.log('methodName, value', methodName, value)
    this.unity.SendMessage('ModelControl', methodName, value)
  }
  send (type, data, targetOrigin = '*') {
    const message = {
      type: this.getMessageType(type),
      data
    }
    content.postMessage(message, targetOrigin)
  }
  onMessage (data) {
    const detail = data.data
    this.emit(detail.type, detail.data)
  }
  destruction () {
    window.removeEventListener('message', this._onMessage)
  }
}