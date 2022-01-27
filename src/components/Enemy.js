import './Enemy.css'

function Enemy({ x, y, check }) {
  return (
    <div
      className="enemy"
      style={{
        position: 'absolute',
        backgroundColor: check ? 'blue' : 'black',
        transform: `translate(${x}px, ${y}px)`,
      }}
    ></div>
  )
}

export default Enemy
