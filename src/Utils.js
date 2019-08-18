export function getRandomValue(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

export function generateProbability(probability) {
  let foo = getRandomValue(0, probability)
  let temp = false

  if(foo == 1)  {
    temp = true
  }

  return temp
}