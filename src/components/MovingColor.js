import { useRef, useEffect } from "react";
import newColors from "../colors";
import { ENDED } from "../constants";

const BASE_SIZE = 20

function useOutsideHandler(ref, screenRef, handler) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target) && screenRef.current.contains(event.target)) {
        handler()
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
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
  useOutsideHandler(ref, screenRef, lose);

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
        top: randomMove(screenRef.current?.offsetHeight),
        left: randomMove(screenRef.current?.offsetWidth)

      }}
      onClick={() => {
        if(status < ENDED)
        addPoint()
        setColors(newColors(spread))
      }}
    >
    </button>
  )
}

const randomMove = (max) => max ? `${Math.floor(Math.random() * (max - BASE_SIZE))}px` : 0
