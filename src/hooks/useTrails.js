import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  distanceFilter,
  filterByDifficulty,
  filterByType,
  filterByDistance,
  filterByDuration,
} from 'utils/filter'
import { trailsData } from 'services/trails'
import { setTrails } from 'store/slices/appSlice'

export const useTrails = () => {
  const dispatch = useDispatch()

  const trailFilters = useSelector((state) => state.filter.trailFilters)

  // console.log('trailsData', trailsData[11].features[0].geometry.coordinates)

  let trails = trailsData.map((t) => ({
    properties: t.features[0].properties,
    description: t.features[0].description,
    waypoints: t.features[0].geometry.coordinates.map((c) => {
      if (t.features[0].geometry.type == 'MultiPolygon') {
        return c[0].map((c) => ({ longitude: c[0], latitude: c[1] }))
      }
      return {
        longitude: c[0],
        latitude: c[1],
      }
    }),
    trailType: t.features[0].geometry.type,
    elevations: t.features[0].geometry.coordinates.map((c) => c[2]),
  }))

  // console.log('trailFilters', trailFilters)

  const difficultySelected = trailFilters.difficulty.map((i) => i.id)
  const distanceSelected = trailFilters.distance.map((i) => i.id)
  const durationSelected = trailFilters.duration.map((i) => i.id)
  const typeSelected = trailFilters.type.map((i) => i.id)

  let filtered = trails

  filtered = distanceFilter(distanceSelected, filtered, filterByDistance)
  filtered = distanceFilter(durationSelected, filtered, filterByDuration, 'duration')
  filtered = distanceFilter(difficultySelected, filtered, filterByDifficulty, 'difficulty')
  filtered = distanceFilter(typeSelected, filtered, filterByType, 'type')

  // trailsData[11].features[0].geometry.coordinates[0].map((t) => console.log(t[2]))
  // console.log('trailsData', trails[11].features[0].geometry.coordinates)

  React.useEffect(() => {
    dispatch(setTrails(filtered))
  }, [trailFilters])
}
