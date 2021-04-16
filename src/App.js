import React, { useEffect, useRef, useState } from 'react'
import './App.css'

function App() {

  const canvasRef = useRef(null)
  const contextRef = useRef(null)
  const [isDrawing, setIsDrawing] = useState(false)
  const [color, setColor] = useState("white")
  const [locations, setLocations] = useState([])

  useEffect(() => {
    const canvas = canvasRef.current
    canvas.width = window.innerWidth * 2
    canvas.height = window.innerHeight * 2
    canvas.style.width = `${window.innerWidth}px`
    canvas.style.height = `${window.innerHeight}px`

    const context = canvas.getContext("2d")
    context.scale(2,2)
    context.lineCap = "round"
    context.strokeStyle = color
    context.lineWidth = 5
    contextRef.current = context
  }, [color])

  const startDrawing = ({nativeEvent}) => {
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.beginPath()
    contextRef.current.moveTo(offsetX, offsetY)
    setIsDrawing(true)
  }

  const finishDrawing = () => {
    contextRef.current.closePath()
    setIsDrawing(false)
  }

  const draw = ({nativeEvent}) => {
    if(!isDrawing){
      return 
    }
    const { offsetX, offsetY } = nativeEvent
    contextRef.current.lineTo(offsetX, offsetY)
    contextRef.current.stroke()
  }

  const canvasStyle = {
    backgroundColor: "black",
  }

  console.log(locations)
  return (
    <>
      <button onClick={() => {setColor("black")}}>Black</button>
      <button onClick={() => {setColor("gray")}}>Gray</button>
      <button onClick={() => {setColor("red")}}>Red</button>
      <button onClick={() => {setColor("yellow")}}>Yellow</button>
      <button onClick={() => {setColor("blue")}}>Blue</button>
      <canvas
        style={canvasStyle}
        onMouseDown={startDrawing}
        onMouseUp={finishDrawing}
        onMouseMove={draw}
        ref={canvasRef}
      />
    </>
  )
}

export default App;
