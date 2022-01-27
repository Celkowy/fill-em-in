import Square from './Square'
import Enemy from './Enemy'
import './PlaceSquares.css'
import React, { useState } from 'react'
import useKeypress from 'react-use-keypress'

function placeEnemy() {
  const positionTable = [0, 60, 120, 180, 240]

  const arr = []
  for (let i = 0; i < 15; i += 1) {
    let x, y
    do {
      x = positionTable[Math.floor(Math.random() * positionTable.length)]
      y = positionTable[Math.floor(Math.random() * positionTable.length)]
      // eslint-disable-next-line
    } while (arr.find(w => w.x === x && w.y === y) || (x === 0 && y === 0))
    arr.push({ x, y, check: false, index: i })
  }
  return arr
}

function checkIfWin(enemy) {
  return enemy.every(el => {
    if (el.check) {
      return true
    }
    return false
  })
}

function PlaceSquares() {
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [enemy, setEnemy] = useState(placeEnemy())

  useKeypress(['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', ' '], event => {
    if (checkIfWin(enemy)) return

    if (event.key === 'ArrowLeft') {
      if (x > 0) {
        setX(x - 60)
      }
    } else if (event.key === 'ArrowRight') {
      if (x < 240) {
        setX(x + 60)
      }
    } else if (event.key === 'ArrowUp') {
      if (y > 0) {
        setY(y - 60)
      }
    } else if (event.key === 'ArrowDown') {
      if (y < 240) {
        setY(y + 60)
      }
    } else if (event.key === ' ') {
      const enemyFind = enemy.find(el => {
        if (el.x === x && el.y === y) {
          return true
        }
        return false
      })
      if (enemyFind) {
        setEnemy(
          enemy.map(el => {
            if (el.x === x && el.y === y) {
              return { ...el, check: true }
            } else {
              return el
            }
          })
        )
      }
    }
  })

  function restart() {
    setX(0)
    setY(0)
    setEnemy(placeEnemy())
  }

  return (
    <>
      <div className="container">
        {enemy.map(enemy => (
          <Enemy x={enemy.x} y={enemy.y} check={enemy.check} key={enemy.index} />
        ))}
        <Square x={x} y={y} />
      </div>
      {checkIfWin(enemy) ? (
        <>
          <div className="wrapper">
            <div className="win">You win!</div>
            <button onClick={restart}>Restart</button>
          </div>
        </>
      ) : null}
    </>
  )
}

export default PlaceSquares
