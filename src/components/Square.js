import React, { useState } from 'react'

function Square({ x, y }) {
  return (
    <div
      className="square"
      style={{
        transform: `translate(${x}px, ${y}px)`,
      }}
    ></div>
  )
}

export default Square
