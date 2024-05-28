export const defaultXYZ = {x:0,y:0,z:0}
export const defaultTentacleData = {
  rotation: defaultXYZ,
  scale: 1,
  material: {
    _MainColor1: defaultXYZ,
    _MainColor2: defaultXYZ,
    _MatcapColor1: defaultXYZ,
    _MatcapColor2: defaultXYZ,
    _MatcapColor3: defaultXYZ,
    _FalmeColor: defaultXYZ,
    _RimColor: defaultXYZ,
    _InsideColor: defaultXYZ,
  }
}
window.defaultTentacleData = defaultTentacleData
export const defaultMainColor1 = {
  x: 0.15,
  y: 0.15,
  z: 0.15
}
export const defaultFalmeColor = {x: 0.5, y: 1, z: 1}
export const tentacleObjectData = [
  {
    rotation: {x: 20, y: 20, z: 20},
    scale: 0.8,
    material: {
      _MainColor1: defaultMainColor1,
      _MainColor2: {x: 0.37, y: 0.37, z: 0.37},
      _MatcapColor1: {x: 0.2, y: 0.85, z: 1},
      _MatcapColor2: {x: 1, y: 0.4, z: 0.75},
      _MatcapColor3: {x: 0.55, y: 0, z: 0.44},
      _FalmeColor: defaultFalmeColor,
      _RimColor: {x: 0.7, y: 0.3, z: 0.8},
      _InsideColor: {x: 0.5, y: 0.5, z: 0.9},
    }
  },
  {
    rotation: {x: 10, y: 90, z: 20},
    scale: 1,
    material: {
      _MainColor1: {
          x: 0.15,
          y: 0.15,
          z: 0.15
      },
      _MainColor2: {
          x: 0.12,
          y: 0.12,
          z: 0.12
      },
      _MatcapColor1: {
          x: 0.2,
          y: 1,
          z: 0.95
      },
      _MatcapColor2: {
          x: 1,
          y: 0.35,
          z: 0
      },
      _MatcapColor3: {
          x: 0,
          y: 0.1,
          z: 0.2
      },
      _FalmeColor: {
          x: 0.5,
          y: 1,
          z: 1
      },
      _RimColor: {
          x: 0.38,
          y: 0.8,
          z: 0.3
      },
      _InsideColor: {
          x: 0.5,
          y: 0.85,
          z: 0.9
      }
    }
  },
  {
    rotation: {x: 70, y: 10, z: 90},
    scale: 0.9,
    material: {
      _MainColor1: {
          x: 0.15,
          y: 0.15,
          z: 0.15
      },
      _MainColor2: {
          x: 0.22,
          y: 0.22,
          z: 0.22
      },
      _MatcapColor1: {
          x: 1,
          y: 0.6,
          z: 0.98
      },
      _MatcapColor2: {
          x: 1,
          y: 0.1,
          z: 0
      },
      _MatcapColor3: {
          x: 1,
          y: 0.6,
          z: 0.3
      },
      _FalmeColor: {
          x: 0.5,
          y: 1,
          z: 1
      },
      _RimColor: {
          x: 0.8,
          y: 0.8,
          z: 0.3
      },
      _InsideColor: {
          x: 0.9,
          y: 0.8,
          z: 0.5
      }
  }
  },
  {
    rotation: {x: 20, y: -10, z: 20},
    scale: 1.05,
    material: {
      _MainColor1: {
          x: 0.15,
          y: 0.15,
          z: 0.15
      },
      _MainColor2: {
          x: 0.1,
          y: 0.1,
          z: 0.1
      },
      _MatcapColor1: {
          x: 0.6,
          y: 0,
          z: 0.1
      },
      _MatcapColor2: {
          x: 1,
          y: 0,
          z: 0.8
      },
      _MatcapColor3: {
          x: 0.5,
          y: 0,
          z: 0
      },
      _FalmeColor: {
          x: 0.5,
          y: 1,
          z: 1
      },
      _RimColor: {
          x: 0.35,
          y: 0,
          z: 0
      },
      _InsideColor: {
          x: 1,
          y: 0,
          z: 0.02
      }
  }
  },
  {
    rotation: {x: 10, y: 0, z: -5},
    scale: 1.25,
    material: {
      _MainColor1: {
          x: 0.15,
          y: 0.15,
          z: 0.15
      },
      _MainColor2: {
          x: 0.26,
          y: 0.26,
          z: 0.26
      },
      _MatcapColor1: {
          x: 0.04,
          y: 0.3,
          z: 0
      },
      _MatcapColor2: {
          x: 1,
          y: 0,
          z: 0.66
      },
      _MatcapColor3: {
          x: 0.3,
          y: 0.1,
          z: 0
      },
      _FalmeColor: {
          x: 0.5,
          y: 1,
          z: 1
      },
      _RimColor: {
          x: 0,
          y: 2,
          z: 0
      },
      _InsideColor: {
          x: 0,
          y: 0.12,
          z: 0.05
      }
  }
  },
]
// export const tentacleData = [
//   {
//     ChangeRotation: '20,20,20',
//     ChangeScale: valueToUnityScale(0.8),
//     ChangeModelMaterial: '0.15,0.15,0.15|0.37,0.37,0.37|0.2,0.85,1|1,0.4,0.75|0.55,0,0.44|0.5,1,1|0.7,0.3,0.8|0.5,0.5,0.9'
//   },
//   {
//     ChangeRotation: '10,90,20',
//     ChangeScale: valueToUnityScale(1),
//     ChangeModelMaterial: '0.15,0.15,0.15|0.12,0.12,0.12|0.2,1,0.95|1,0.35,0|0,0.1,0.2|0.5,1,1|0.38,0.8,0.3|0.5,0.85,0.9'
//   },
//   {
//     ChangeRotation: '70,10,90',
//     ChangeScale: valueToUnityScale(0.9),
//     ChangeModelMaterial: '0.15,0.15,0.15|0.22,0.22,0.22|1,0.6,0.98|1,0.1,0|1,0.6,0.3|0.5,1,1|0.8,0.8,0.3|0.9,0.8,0.5'
//   },
//   {
//     ChangeRotation: '20,-10,20',
//     ChangeScale: valueToUnityScale(1.05),
//     ChangeModelMaterial: '0.15,0.15,0.15|0.1,0.1,0.1|0.6,0,0.1|1,0,0.8|0.5,0,0|0.5,1,1|0.35,0,0|1,0,0.02'
//   },
//   {
//     ChangeRotation: '10,0,-5',
//     ChangeScale: valueToUnityScale(1.25),
//     ChangeModelMaterial: '0.15,0.15,0.15|0.26,0.26,0.26|0.04,0.3,0|1,0,0.66|0.3,0.1,0|0.5,1,1|0.0,2,0|0,0.12,0.05'
//   },
// ]


export function valueToUnityScale (value) {
  return `${value},${value},${value}`
}

export function valueToUnityRotation (value) {
  return `${value.x},${value.y},${value.z}`
}

export function unityToValueMaterial(value) {
  let result = '';
  const keys = [
      '_MainColor1',
      '_MainColor2',
      '_MatcapColor1',
      '_MatcapColor2',
      '_MatcapColor3',
      '_FalmeColor',
      '_RimColor',
      '_InsideColor'
  ];
  for (let i = 0; i < keys.length; i++) {
      const key = keys[i];
      const { x, y, z } = value[key];
      result += `${x},${y},${z}|`;
  }
  // 去除末尾的 '|' 符号
  return result.slice(0, -1);
}