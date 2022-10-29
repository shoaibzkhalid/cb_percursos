import trail1 from 'assets/geojson/21.json'
import trail2 from 'assets/geojson/22.json'
import trail3 from 'assets/geojson/23.json'
import trail4 from 'assets/geojson/24.json'
import trail5 from 'assets/geojson/25.json'
import trail6 from 'assets/geojson/26.json'

export const getTrails = () => {
  const trails = [trail1, trail2, trail3, trail4, trail5, trail6]

  return trails.map((t) => ({
    properties: t.features[0].properties,
    waypoints: t.features[0].geometry.coordinates.map((c) => ({
      longitude: c[0],
      latitude: c[1],
    })),
  }))
}
