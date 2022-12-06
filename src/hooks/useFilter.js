import { useDispatch, useSelector } from 'react-redux'

import {
  setDifficulty,
  setDistance,
  setDuration,
  setFiltering,
  setType,
} from 'store/slices/filterSlice'
import { setFilteredTrails } from 'store/slices/trailSlice'
import { useFilteredTrails } from './useTrails'

export const useFilter = () => {
  const dispatch = useDispatch()
  useFilteredTrails()

  let trails = useSelector((state) => state.trail.trails)

  const type = useSelector((state) => state.filter.type)
  const distance = useSelector((state) => state.filter.distance)
  const duration = useSelector((state) => state.filter.duration)
  const difficulty = useSelector((state) => state.filter.difficulty)

  const setFilter = (filter, list) => {
    const { name } = filter

    switch (name) {
      case 'type':
        return dispatch(setType(list))
      case 'distance':
        return dispatch(setDistance(list))
      case 'duration':
        return dispatch(setDuration(list))
      default:
        return dispatch(setDifficulty(list))
    }
  }

  const setLoading = (loading) => {
    setTimeout(() => {
      dispatch(setFiltering(loading))
    }, 1)
  }

  const clearFilters = () => {
    setTimeout(() => {
      dispatch(setFiltering(false))
    }, 1)

    dispatch(setType([]))
    dispatch(setDifficulty([]))
    dispatch(setDistance([]))
    dispatch(setDuration([]))
    dispatch(setFilteredTrails(trails))
  }

  return {
    setFilter,
    clearFilters,
    lFilters: {
      distance,
      duration,
      type,
      difficulty,
    },
    setLoading,
  }
}
