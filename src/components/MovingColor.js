import { useRef, useEffect, useState } from "react";
import newColors from "../colors";
import { ENDED, STARTED } from "../constants";

const BASE_SIZE = 20

function useOutsideHandler(ref, screenRef, handler, status) {
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
  }, [ref]);
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

export default function MovingColor({
  status,
  winnerColor,
  addPoint,
  lose,
  setColors,
  spread,
  screenRef
}) {

  const ref = useRef(null);
  useOutsideHandler(ref, screenRef, lose, status);

  const [coords, changeCoords] = useCoords(screenRef)

  return (
    <button
      ref={ref}
      css={{
        width: BASE_SIZE,
        height: BASE_SIZE,
        padding: 0,
        background: `${winnerColor}`,
        border: status === ENDED ? "1px solid white" : "unset",
        position: "absolute",
        left: coords.x,
        top: coords.y

      }}
      onClick={() => {
        if (status === STARTED) {
          addPoint()
          setColors(newColors(spread))
          changeCoords()
        }
      }}
    >
    </button>
  )
}

const randomMove = (max) => max ? `${Math.floor(Math.random() * (max - BASE_SIZE))}px` : 0
