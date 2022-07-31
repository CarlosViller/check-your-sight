import React from "react";
import { useReducer } from "react";
import Screen from "../src/components/Screen";
import { READY, STARTED, ENDED, START, POINT, FAILED, LV } from "../src/constants";
import Button from "../src/components/interface/Button";
import Head from "next/head";

const CHANGE_FACTOR = 5
const MAX_COLORS_INDEX = LV.length - 1

function reducer(state, action) {
  switch (action.type) {
    case START:
      return { status: STARTED, points: 0 }
    case POINT:
      return { status: STARTED, points: state.points + 1 }
    case FAILED:
      return { ...state, status: ENDED }

    default:
      throw new Error(`Unknown action type ${action.type}`)
  }
}

export default function App() {

  const [state, dispatch] = useReducer(reducer, {
    status: READY,
    points: 0,
  })

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div
        css={{
          position: "relative",
          height: "calc(100vh - 40px)",
          margin: 20,
          borderRadius: 10,
        }}
      >
        <Screen
          dispatch={dispatch}
          gameState={state}
        />
        <div
          css={{
            width: "100%",
            height: 125,
            position: "absolute",
            bottom: 0,
            borderRadius: "0 0 5px 5px",
          }}
        >
          <div
            css={{
              fontFamily: '"Press Start 2P", cursive',
              height: "100%",
              width: "max-content",
              margin: "0 auto",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {state.status !== ENDED
              ? (
                <span css={{
                  fontSize: 64,
                  color: selectColor(state.points)
                }}>
                  {state.points}
                </span>
              )
              : (
                <Button onClick={() => dispatch({ type: START })}>
                  Retry?
                </Button>
              )
            }
          </div>
        </div>
      </div>
    </>
  )
}

function selectColor(points) {
  const index = Math.floor(points / CHANGE_FACTOR)
  return index < MAX_COLORS_INDEX ? LV[index] : LV[MAX_COLORS_INDEX]
}