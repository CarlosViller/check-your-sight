import { useRef, useState } from "react"
import MovingColor from "./MovingColor";
import newColors from "../colors";

export default function Screen({ addPoint, lose, state, spread = 10 }) {

  // Format: { bkg: rgbColor <string>, winner: rgbColor <string> }
  const [colors, setColors] = useState(newColors(spread))
  const screenRef = useRef(null)

  return (
    <div
      ref={screenRef}
      css={{
        position: "relative",
        width: "50%",
        height: "calc(100% - 125px)",
        background: `${colors.bkg}`,
        margin: "0 auto",
      }}
    >
      <MovingColor
        winnerColor={colors.winner}
        status={state.status}
        addPoint={addPoint}
        lose={lose}
        setColors={setColors}
        spread={spread}
        screenRef={screenRef}
      />
    </div>
  )
}
