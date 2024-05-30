import { gsap } from 'gsap'

export function animationPosition () {
  const data = { x:0, y:0, z:0}
  const tl = gsap.to(data, {
    repeat: -1,
    paused: true,
    duration: 10,
    motionPath: {
      path: pathList, 
      curviness: 2
    },
    ease: "none",
  });
  return {
    data,
    tl
  }
}

const pathList = [
  {
    x: 0,
    y: 0.1,
    z: 0.2
  },
  {
    x: 0.1,
    y: 0.05,
    z: 0.3
  },
  {
    x: 0.1,
    y: 0.05,
    z: 0.3
  },
  {
    x: 0.3,
    y: -0.05,
    z: 0.1
  },
  {
    x: 0,
    y: 0,
    z: 0
  }
]