import { useReducer, useState } from "react";
import Screen from "../src/components/Screen";
import { READY, STARTED, ENDED } from "../src/constants";
import Button from "../src/components/interface/Button";
import PointsCounter from "../src/components/interface/PointsCounter";

const RESTART = "restart"
const POINT = "point"
const FAILED = "failed"
const START = "start"

function reducer(state, action) {
  switch (action.type) {
    case START:
      return { ...state, status: STARTED }
    case POINT:
      return { ...state, points: state.points + 1 }
    case FAILED:
      return { ...state, status: ENDED }
    case RESTART:
      return { status: READY, points: 0 }

    default:
      throw new Error(`Unknown action type ${action.type}`)
  }
}

export default function App() {

  const [state, dispatch] = useReducer(reducer, {
    status: READY,
    points: 0
  })

  return (
    <div
      css={{
        position: "relative",
        height: "calc(100vh - 40px)",
        margin: 20,
        border: "2px solid green",
        borderRadius: 10,
      }}
    >
      <Screen
        addPoint={() => dispatch({ type: POINT })}
        lose={() => dispatch({ type: FAILED })}
        state={state}
      />
      <div
        css={{
          width: "100%",
          minHeight: 125,
          background: "gray",
          position: "absolute",
          bottom: 0,
          borderRadius: "0 0 5px 5px",
        }}
      >
        {state.status === READY &&
          <Button onClick={() => dispatch({ type: START })}>
            Start
          </Button>
        }
        {state.status === STARTED &&
          <PointsCounter points={state.points} />
        }
        {state.status === ENDED &&
          <Button onClick={() => dispatch({ type: RESTART })}>
            Retry
          </Button>
        }
      </div>
    </div>
  )
}
