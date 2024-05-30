import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import { MotionPathPlugin } from 'gsap/MotionPathPlugin'
import { gsap } from 'gsap'

gsap.registerPlugin(MotionPathPlugin)
createApp(App).mount('#app')
