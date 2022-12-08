import { useDispatch, useSelector } from 'react-redux'
import { useFilter, useLocation } from 'hooks'
import React from 'react'

export const useTrailsData = () => {
  const dispatch = useDispatch()
  const { getLocation } = useLocation()

  const trails = useSelector((state) => state.trail.filteredTrails)
  const filtering = useSelector((state) => state.filter.filtering)
  const { clearFilters } = useFilter()

  React.useEffect(() => {
    return () => {
      clearFilters()
    }
  }, [])

  return { trails, filtering, getLocation }
}
