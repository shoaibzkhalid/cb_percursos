import { useDispatch, useSelector } from 'react-redux'

import { setDifficulty, setDistance, setDuration, setType } from 'store/slices/filterSlice'
import { setFilteredTrails } from 'store/slices/trailSlice'

export const useFilter = () => {
  const dispatch = useDispatch()
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

  const clearFilters = () => {
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
  }
}
