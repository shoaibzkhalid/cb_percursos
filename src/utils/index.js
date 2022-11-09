export const getDifficulty = (distance) => {
  if (distance > 50000) {
    return 'Hard'
  }

  if (distance > 20000) {
    return 'Medium'
  }

  return 'Easy'
}

export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((res, fn) => fn(res), x)
