import React from 'react'
import _ from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { getDistance } from 'geolib'

import {
  distanceFilter,
  filterByDifficulty,
  filterByType,
  filterByDistance,
  filterByDuration,
} from 'utils/filter'
import { trailsData } from 'services/trails'
import { setFilteredTrails, setTrails } from 'store/slices/trailSlice'
import { setApplied, setFiltering } from 'store/slices/filterSlice'

export const useFilteredTrails = () => {
  const dispatch = useDispatch()
  let trails = useSelector((state) => state.trail.trails)

  const applied = useSelector((state) => state.filter.applied)
  const distance = useSelector((state) => state.filter.distance)
  const duration = useSelector((state) => state.filter.duration)
  const difficulty = useSelector((state) => state.filter.difficulty)
  const type = useSelector((state) => state.filter.type)

  const filtering = useSelector((state) => state.filter.filtering)

  trails = distanceFilter(type, trails, filterByType, 'type')
  trails = distanceFilter(distance, trails, filterByDistance)
  trails = distanceFilter(duration, trails, filterByDuration, 'duration')
  trails = distanceFilter(difficulty, trails, filterByDifficulty, 'difficulty')

  React.useEffect(() => {
    if (applied) {
      dispatch(setFilteredTrails(_.orderBy(trails, 'distFromUser', 'asc')))
      dispatch(setApplied(false))
    }
  }, [applied, filtering])
}

export const useTrails = () => {
  const dispatch = useDispatch()
  const userLocation = useSelector((state) => state.app.userLocation)

  const trails = React.useMemo(() => {
    return trailsData.map((t) => ({
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

      ...(userLocation && {
        distFromUser: Math.abs(
          getDistance(t.features[0].geometry.coordinates[0], userLocation) / 1000
        ).toFixed(1),
      }),
    }))
  }, [trailsData])

  React.useEffect(() => {
    dispatch(setTrails(_.orderBy(trails, 'distFromUser', 'asc')))
  }, [])
}
