export default function newColors(spread) {
  const [bkg, winner] = getRandomColors(spread)
  return {
    bkg,
    winner
  }
}

function getRandomColors(spread) {
  const MIN_SPREAD = 2

  const r = (factor = 256) => (Math.random() * factor) >> 0

  const sign = Math.round(Math.random()) === 1 ? 1 : -1
  const red = r()
  const green = r()
  const blue = r()

  const bkg = `rgb(${red}, ${green}, ${blue})`

  const wRed = red + MIN_SPREAD + (sign * spread)
  const wGreen = green + MIN_SPREAD + (sign * spread)
  const wBlue = blue + MIN_SPREAD + (sign * spread)

  const winner = `rgb(${wRed > 255 ? 255 : wRed}, ${wGreen > 255 ? 255 : wGreen}, ${wBlue > 255 ? 255 : wBlue})`

  return [bkg, winner]
}