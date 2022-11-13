import { useSelector } from 'react-redux'

import {
  distanceFilter,
  filterByDifficulty,
  filterByDistance,
  filterByDuration,
} from 'utils/sort'
import { trailsData } from 'services/trails'

export const useTrails = () => {
  const trailFilters = useSelector((state) => state.filter.trailFilters)
  const filtersApplied = useSelector((state) => state.filter.filtersApplied)

  let trails = trailsData.map((t) => ({
    properties: t.features[0].properties,
    description: t.features[0].description,
    waypoints: t.features[0].geometry.coordinates.map((c) => ({
      longitude: c[0],
      latitude: c[1],
    })),

    elevations: t.features[0].geometry.coordinates.map((c) => c[2]),
  }))

  const difficultySelected = trailFilters.difficulty.map((i) => i.id)
  const distanceSelected = trailFilters.distance.map((i) => i.id)
  const durationSelected = trailFilters.duration.map((i) => i.id)

  let filtered = trails

  filtered = distanceFilter(distanceSelected, filtered, filterByDistance)
  filtered = distanceFilter(durationSelected, filtered, filterByDuration, 'duration')
  filtered = distanceFilter(difficultySelected, filtered, filterByDifficulty)

  return {
    trails: filtersApplied ? filtered : trails,
    trailImages: [
      require('../assets/images/21.jpg'),
      require('../assets/images/22.jpg'),
      require('../assets/images/23.jpg'),
      require('../assets/images/24.jpg'),
      require('../assets/images/24.jpg'),
      require('../assets/images/24.jpg'),
      require('../assets/images/24.jpg'),
    ],
  }
}
