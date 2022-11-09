export const filterByDifficulty = (distance, key) => {
  if (key === 6) {
    if (distance < 19000) return true
    return false
  }

  if (key === 7) {
    if (distance > 19000 && distance <= 50000) return true
    return false
  }

  if (key === 8) {
    if (distance > 50000) return true
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

export const distanceFilter = (filters, toFilter, filterer, key = 'distance') => {
  if (!filters.length) return toFilter

  const filtered = filters.map((d) =>
    toFilter.filter(({ properties }) => filterer(properties[key], d))
  )

  return filtered.flat()
}
