import { useReducer, useEffect } from "react";

const initialState = {
  started: false,
  gear: 0,
  speed: 0,
  distance: 0,
};

function reducer(previousState, action) {
  switch(action.type) {
    case "start":
      return { ...previousState, started: true };

    case "stop":
      return { ...previousState, gear: 0, started: false };

    case "move":
      if (previousState.started) {
        return { ...previousState, distance: previousState.distance + previousState.speed };
      }
      return previousState;

    case "accelerate":
      if (previousState.started && previousState.gear !== 0) {
        return {
          ...previousState,
          speed: previousState.speed + previousState.gear * 10,
        };
      }
      return previousState;

    case "gearUp":
      if (previousState.started && previousState.gear < 5) {
        return { ...previousState, gear: previousState.gear + 1 };
      }
      return previousState;

    case "gearDown":
      if (previousState.started && previousState.gear > -2) {
        return { ...previousState, gear: previousState.gear - 1 };
      }
      return previousState;

    default:
      return previousState;
  }
}

export default function App() {
  const [state, dispatch] = useReducer(reducer, initialState);

  // useEffect is the bonus solution
  useEffect(() => {
    const interval = setInterval(() => {
        dispatch({ type: "move" })
    }, 1000);
    return () => { clearInterval(interval); }
  }, []);

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Boating with useReducer</h1>
      <p>Engine {state.started ? "ON" : "OFF"}</p>
      <p>Speed: {state.speed}</p>
      <p>Current gear: {state.gear}</p>
      <p>Distance travelled: {state.distance}</p>

      <button onClick={() => dispatch({ type: "start" })}>Start engine</button>
      <button onClick={() => dispatch({ type: "stop" })}>Stop engine</button>
      <button onClick={() => dispatch({ type: "accelerate" })}>Accelerate</button>
      <button onClick={() => dispatch({ type: "gearUp" })}>Gear up</button>
      <button onClick={() => dispatch({ type: "gearDown" })}>Gear down</button>
    </div>
  );
}