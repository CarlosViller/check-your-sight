export default function newColors(spread) {
  const MIN_SPREAD = 7

  const r = (factor = 256) => (Math.random() * factor) >> 0

  const sign = Math.round(Math.random()) === 1 ? 1 : -1
  const red = r()
  const green = r()
  const blue = r()

  const bkg = `rgb(${red}, ${green}, ${blue})`

  const wRed = red + (MIN_SPREAD + spread) * sign
  const wGreen = green + (MIN_SPREAD + spread) * sign
  const wBlue = blue + (MIN_SPREAD + spread) * sign

  const winner = `rgb(${colorCorrection(wRed)}, ${colorCorrection(wGreen)}, ${colorCorrection(wBlue)})`

  return { bkg, winner }
}

function colorCorrection(color) {
  if(color < 0) return 0
  if(color > 255) return 255
  return color
}