const schema_video = [
  {
    id: 71,
    name: "QB_08_dir_07_09",
    video: "/quakenbrueck/QB_8_dir_7_9",
    degree: 2,
    distance_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -12.2455, y: -2.5548, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      },
      {
        direction: 2,
        screen_coordinates:
          { x: 10.4542, y: -1.7619, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      }
    ],
    sign_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -12.6377, y: 1.7075, z: 1.1536, rx: -0.0016, ry: -0.092, rz: -0.017, w: 2.4399, h: 2 },
        // type: 'forbidden'
      },
      {
        direction: 2,
        screen_coordinates:
          { x: 9.0164, y: 2.3852, z: -3.7665, rx: 0, ry: 0.3941, rz: 0, w: 3, h: 2 },
        // type: 'ows_right' 
      }
    ],
    crowd_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -12.2455, y: -1.5548, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      },
      {
        direction: 2,
        screen_coordinates:
          { x: 10.4542, y: -0.7619, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      }
    ],
  },

  {
    id: 70,
    name: "QB_03_dir_04_14",
    video: "/quakenbrueck/QB_3_dir_4_14",
    degree: 2,
    distance_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -10.7478, y: -1.5858, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      },
      {
        direction: 2,
        screen_coordinates:
          { x: 13.8312, y: -2.1437, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      }
    ],
    sign_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -21.3391, y: 0.2616, z: -7.6681, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
        // type: 'forbidden'
      },
      {
        direction: 2,
        screen_coordinates:
          { x: 34.5609, y: -0.8207, z: -4.8326, rx: -3.1318, ry: -0.5352, rz: -3.0655, w: 3, h: 2 },
        // type: 'ows_left' // TODO: think about how to handle different types of signs 
      }
    ],
    crowd_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -11.7478, y: -0.5858, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      },
      {
        direction: 2,
        screen_coordinates:
          { x: 13.8312, y: -1.1437, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      }
    ],
  },

  {
    id: 170,
    name: "QB_09_dir_11_30_08",
    video: "/QB/QB_9_dir_11_30_8",
    degree: 3,
    distance_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -17.3026, y: -1.3301, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      },
      {
        direction: 2,
        screen_coordinates:
          { x: 2.7121, y: -1.2518, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      },
      {
        direction: 3,
        screen_coordinates:
          { x: 19.2691, y: -1.2883, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      }
    ],
    sign_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -7.2107, y: 0.2959, z: 2.5718, rx: 0.0491, ry: 0.6844, rz: -0.0713, w: 0.3068, h: 1.1943 },
      },
      {
        direction: 2,
        screen_coordinates:
          { x: 27.778, y: 2.0951, z: -5.2062, rx: 0, ry: -1.0321, rz: -0, w: 1.1186, h: 2 },
      },
      {
        direction: 3,
        screen_coordinates:
          { x: 30.0, y: 2.0951, z: -5.2062, rx: 0, ry: -1.0321, rz: -0, w: 1.1186, h: 2 },
      }
    ],
    crowd_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -17.3026, y: -0.3301, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      },
      {
        direction: 2,
        screen_coordinates:
          { x: 2.7121, y: -0.2518, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      },
      {
        direction: 3,
        screen_coordinates:
          { x: 19.2691, y: -0.2883, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      }
    ],
  },

  {
    id: 171,
    name: "QB_C_19_dir_32_20_27",
    video: "/QB_C_19_from_18_dir_32_20_27/QB_19_dir_32_20_27_80per",
    degree: 3,
    distance_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -17.1543, y: -3.1694, z: -0.9238, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      },
      {
        direction: 2,
        screen_coordinates:
          { x: 7.5349, y: -2.8044, z: -1.7262, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      },
      {
        direction: 3,
        screen_coordinates:
          { x: 27.0933, y: -1.642, z: -3.2954, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      }
    ],
    sign_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -13.1759, y: 1.2147, z: 0, rx: 0, ry: -0.2346, rz: -0.064, w: 3.9207, h: 1.3402 },
        // type: 'ows_left'
      },
      {
        direction: 2,
        screen_coordinates:
          { x: -1.1759, y: 1.2147, z: 0, rx: 0, ry: -0.2346, rz: -0.064, w: 3.9207, h: 1.3402 },
      },
      {
        direction: 3,
        screen_coordinates:
          { x: 21.0765, y: 1.8314, z: -2.0322, rx: -3.1416, ry: -1.0321, rz: -3.1416, w: 0.532, h: 1.1626 },
        // type: 'forbidden' 
      }
    ],
    crowd_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -17.1543, y: -2.1694, z: -0.9238, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      },
      {
        direction: 2,
        screen_coordinates:
          { x: 7.5349, y: -1.8044, z: -1.7262, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      },
      {
        direction: 3,
        screen_coordinates:
          { x: 27.0933, y: -0.642, z: -3.2954, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      }
    ],

  }
]

const schema_scene = [
  {
    id: 123,
    scenario_name: "test_scene_2",
    location_name: 'test_location_2',
    degree: 2,
    signs: [
      {
        direction: 1,
        sign: 'stop'
      },
      {
        direction: 2,
        sign: 'go'
      }
    ],
    crowds: [
      {
        direction: 1,
        crowdedness: 0
      },
      {
        direction: 2,
        crowdedness: 1
      }
    ],
    distances: [
      {
        direction: 1,
        distance: 200
      },
      {
        direction: 2,
        distance: 300
      }
    ]

  },
  {
    id: 456,
    scenario_name: "test_scene_3",
    location_name: 'test_location_3',
    degree: 3,
    signs: [
      {
        direction: 1,
        sign: 'stop'
      },
      {
        direction: 2,
        sign: 'go'
      },
      {
        direction: 3,
        sign: ''
      }
    ],
    crowds: [
      {
        direction: 1,
        crowdedness: 0
      },
      {
        direction: 2,
        crowdedness: 1
      },
      {
        direction: 3,
        crowdedness: 1
      }
    ],
    distances: [
      {
        direction: 1,
        distance: 200
      },
      {
        direction: 2,
        distance: 300
      },
      {
        direction: 3,
        distance: 100
      }
    ]

  }
]

module.exports = { schema_video, schema_scene };