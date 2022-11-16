import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import {
  distanceFilter,
  filterByDifficulty,
  filterByDistance,
  filterByDuration,
} from 'utils/sort'
import { trailsData } from 'services/trails'
import { setTrails } from 'store/slices/appSlice'

export const useTrails = () => {
  const dispatch = useDispatch()

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

  React.useEffect(() => {
    dispatch(setTrails(filtersApplied ? filtered : trails))
  }, [filtersApplied])
}
