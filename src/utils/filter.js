import { FilterTypes } from 'enums/filterTypes'

export const filterByType = (key, val) => {
  if (key === FilterTypes.bike && val === 'BIKE') {
    return true
  }

  if (key === FilterTypes.walk && val === 'WALK') {
    return true
  }

  return false
}

export const filterByDifficulty = (key, val) => {
  if (key === FilterTypes.easy && val === 'easy') {
    return true
  }

  if (key === FilterTypes.medium && val === 'medium') {
    return true
  }

  if (key === FilterTypes.hard && val === 'hard') {
    return true
  }

  return false
}

export const filterByDistance = (key, val) => {
  if (key === FilterTypes.zeroTo10KM && val > 0 && val <= 10000) {
    return true
  }

  if (key === FilterTypes.tenTo40KM && val > 10000 && val <= 40000) {
    return true
  }

  if (key === FilterTypes.fortyTo100KM && val > 40000 && val <= 100000) {
    return true
  }

  return false
}

export const filterByDuration = (key, val) => {
  if (key === FilterTypes.oneTo4Hr && val > 59 && val <= 240) {
    return true
  }

  if (key === FilterTypes.fiveTo10hr && val > 240 && val <= 600) {
    return true
  }

  if (key === FilterTypes.above10Hr && val > 600) {
    return true
  }

  return false
}

export const distanceFilter = (ids, toFilter, filterer, key = 'distance') => {
  if (!ids.length) return toFilter

  const filtered = ids.map((id) =>
    toFilter.filter(({ properties }) => filterer(id, properties[key]))
  )

  return filtered.flat()
}
