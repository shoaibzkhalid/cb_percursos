export const filterByDifficulty = (difficulty, key) => {
  if (key === 6) {
    if (difficulty === 'easy') return true
    return false
  }

  if (key === 7) {
    if (difficulty === 'medium') return true
    return false
  }

  if (key === 8) {
    if (difficulty === 'hard') return true
    return false
  }

  return false
}

export const filterByDistance = (distance, key) => {
  if (key === 0) {
    if (distance > 0 && distance <= 10000) return true
    return false
  }

  if (key === 1) {
    if (distance > 10000 && distance <= 40000) return true
    return false
  }

  if (key === 2) {
    if (distance > 40000 && distance <= 100000) return true
    return false
  }

  return false
}

export const filterByDuration = (duration, key) => {
  if (key === 3) {
    if (duration > 59 && duration <= 240) return true
    return false
  }

  if (key === 4) {
    if (duration > 240 && duration <= 600) return true
    return false
  }

  if (key === 5) {
    if (duration > 600) return true
    return false
  }

  return false
}

export const filterByType = (type, key) => {
  console.log('filterByType', type, key)

  if (key === 8) {
    if (type === 'BIKE') return true
    return false
  }

  if (key === 9) {
    if (type === 'WALK') return true
    return false
  }

  return false
}

export const distanceFilter = (filters, toFilter, filterer, key = 'distance') => {
  if (!filters.length) return toFilter

  const filtered = filters.map((filterKey) =>
    toFilter.filter(({ properties }) => filterer(properties[key], filterKey))
  )

  return filtered.flat()
}
