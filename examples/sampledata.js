const schema_video = [
  {
    id: 86,
    name: "test_x",
    video: "/Locations/QB_29_dir_11_28",
    degree: 2,
    distance_overlays: [
      {
        direction: 1,
        screen_coordinates:
          { x: -18.6487, y: 1.1147, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      }
    ],
    crowd_overlays: [
      {
        direction: 2,
        screen_coordinates:
          { x: 17.9157, y: 2.4451, z: 0, rx: 0, ry: 0, rz: 0, w: 3, h: 2 },
      }
    ],

  },
]

const schema_scene = [
  {
    id: 86,
    scenario_name: "test_scene",
    location_name: 'test location',
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
]

module.exports = {schema_video, schema_scene};