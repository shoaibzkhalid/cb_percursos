export const getDifficulty = (distance) => {
  if (distance > 50000) {
    return 'HARD'
  }

  if (distance > 20000) {
    return 'MEDIUM'
  }

  return 'EASY'
}

export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((res, fn) => fn(res), x)
