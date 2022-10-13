import React from "react";
import { useReducer } from "react";
import Screen from "../src/components/Screen";
import { READY, STARTED, ENDED, START, POINT, FAILED, LV } from "../src/constants";
import Button from "../src/components/interface/Button";
import Head from "next/head";
import { NAME } from "../src/constants";

const CHANGE_FACTOR = 5
const MAX_COLORS_INDEX = LV.length - 1
const DECREASING_FACTOR = 3
const INITIAL_SPREAD = 50

function reducer(state, action) {
  switch (action.type) {
    case START:
      return { status: STARTED, points: 0, spread: INITIAL_SPREAD }
    case POINT:
      return {
        status: STARTED,
        points: state.points + 1, 
        spread: state.spread >= DECREASING_FACTOR ?  state.spread - DECREASING_FACTOR : 0
      }
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
    spread: INITIAL_SPREAD
  })

  return (
    <>
      <Head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Press+Start+2P&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
      </Head>
      <div
        css={{
          height: "calc(100vh - 40px)",
          margin: 20,
          borderRadius: 10,
        }}
      >
        <Screen dispatch={dispatch} state={state} />
        <div css={{ width: "100%", height: 100, }}>
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
                <span css={{ fontSize: 64, color: selectColor(state.points) }}>
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
        <div css={{ height: 25, display: "flex", justifyContent: "flex-end" }}>
          <a
            href="https://github.com/CarlosViller"
            css={{
              display: "flex",
              alignItems: "center",
              height: "max-content",
              '&:hover': {
                color: randomHoverColor()
              }
            }}
          >
            <span css={{
              marginRight: 8,
              '&:hover': {
                color: "inherit"
              }
            }}
            >
              By Deltaaaaq
            </span>
            <img src="/icons/github.svg" />
          </a>
        </div>
      </div>
    </>
  )
}

const randomHoverColor = () => NAME[Math.floor(Math.random() * NAME.length)]

function selectColor(points) {
  const index = Math.floor(points / CHANGE_FACTOR)
  return index < MAX_COLORS_INDEX ? LV[index] : LV[MAX_COLORS_INDEX]
}
