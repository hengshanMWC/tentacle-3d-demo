import { gsap } from 'gsap'
// Recursive function to animate nested properties
export function animateNestedProperties(target, properties, duration) {
  const result = []
  for (const key in properties) {
      if (typeof properties[key] === 'object' && properties[key] !== null) {
          // If the property is an object, recursively animate its properties
          result.push(...animateNestedProperties(target[key], properties[key], duration))
      } else {
          // Otherwise, animate the property directly
          let animationProperties = {};
          animationProperties[key] = properties[key];
          // console.log('{ duration: duration, ...animationProperties }', { duration: duration, ...animationProperties })
          result.push(gsap.to(target, { duration: duration, ...animationProperties }))
      }
  }
  return result
}

export function newJson (data) {
  return JSON.parse(JSON.stringify(data))
}

export class BatchTween {
  batch = []
  currentData = null
  nextData = null
  requestAnimationFrameId
  constructor (handleUpdate) {
    this.handleUpdate = handleUpdate
    this._onUpdate = this.onUpdate.bind(this)
  }
  start (currentData, nextData) {
    this.destruction()
    this.currentData = newJson(currentData)
    this.nextData = newJson(nextData)
    this.batch = animateNestedProperties(this.currentData, this.nextData, 0.3)
    window.batch = this.batch
    this.update()
  }
  update () {
    this.requestAnimationFrameId = requestAnimationFrame(this._onUpdate)
  }
  onUpdate () {
    this.handleUpdate?.(this.currentData)
    // if (this.batch.length && this.batch.at(-1).isActive()) {
      // console.log('this.batch.every(t => t.isActive())', this.batch.every(t => t.isActive()))
    if (this.batch.every(t => t.isActive())) {
      this.update()
    } else {
      this.handleUpdate?.(this.nextData)
      this.destruction()
    }
  }
  destruction () {
    this.batch.forEach(t => t.kill())
    this.batch.length = 0
    cancelAnimationFrame(this.requestAnimationFrameId)
    this.currentData = null
    this.nextData = null
  }
}