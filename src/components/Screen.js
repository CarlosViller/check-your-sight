import { useRef, useState, useEffect } from "react"
import newColors from "../colors";
import { ENDED, STARTED, POINT, FAILED } from "../constants";

const BASE_SIZE = 20

function useOutsideHandler(ref, screenRef, status, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        status === STARTED &&
        ref.current &&
        !ref.current.contains(event.target) &&
        screenRef.current.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref, screenRef]);
}

function useCoords(screenRef) {
  const [state, setState] = useState({
    x: randomMove(screenRef.current?.offsetWidth),
    y: randomMove(screenRef.current?.offsetHeight)
  })

  function changeCoords() {
    setState({
      x: randomMove(screenRef.current?.offsetWidth),
      y: randomMove(screenRef.current?.offsetHeight)
    })
  }

  return [state, changeCoords]
}

export default function Screen({ dispatch, state, spread = 10 }) {

  // Format: { bkg: rgbColor <string>, winner: rgbColor <string> }
  const [colors, setColors] = useState(newColors(spread))
  const screenRef = useRef(null)

  const blockRef = useRef(null);
  useOutsideHandler(blockRef, screenRef, state.status, () => dispatch({type: FAILED}));

  const [coords, changeCoords] = useCoords(screenRef)

  return (
    <div
      ref={screenRef}
      css={{
        position: "relative",
        width: "60%",
        height: "calc(100% - 145px)",
        background: `${colors.bkg}`,
        margin: "10px auto",
      }}
    >
      <button
        ref={blockRef}
        css={{
          width: BASE_SIZE,
          height: BASE_SIZE,
          padding: 0,
          background: `${colors.winner}`,
          border: state.status === ENDED ? "1px solid white" : "unset",
          position: "absolute",
          left: coords.x,
          top: coords.y

        }}
        onClick={() => {
          if (state.status !== ENDED) {
            dispatch({ type: POINT })
            setColors(newColors(spread))
            changeCoords()
          }
        }}
      >
      </button>
    </div>
  )
}

const randomMove = (max) => max ? `${Math.floor(Math.random() * (max - BASE_SIZE))}px` : 0
