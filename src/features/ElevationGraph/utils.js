export const getXLabels = (data) => {
  let arr = [0]
  const unit = data / 4
  let sum = 0

  for (let index = 0; index < 4; index++) {
    if (sum > data) break
    sum = Math.ceil(sum + unit)
    arr.push(sum)
  }

  return arr
}
