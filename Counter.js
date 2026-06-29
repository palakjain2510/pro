import React, {useState, useRef} from "react";
import "./style.css";

export default function Counter() {
  const [counter,setCounter] = useState(0);
  const [isRunning,setIsRunning] = useState(false);
  const timer = useRef(false);

  function startHandler(){
    if(isRunning) return;
    timer.current = setInterval(()=>{
      setCounter(prev=>prev+1);
    },1000);
    setIsRunning(true);
  }
  function stopHandler(){
    clearInterval(timer.current);
    setIsRunning(false);
    setCounter(0);
  }
  function pauseHandler(){
    clearInterval(timer.current);
    setIsRunning(false);
  }
  return (
    <div>
      <h1>Counter! {counter}</h1>
      <button onClick={startHandler} disabled={isRunning}>Start</button>
      <button onClick={stopHandler} disabled={!isRunning}>Stop</button>
      <button onClick={pauseHandler} disabled={!isRunning}>Pause</button>

    </div>
  );
}
