import React, { useState, useRef } from 'react';
import styled from '@emotion/styled';
import Timer from './Components/Timer';
import Countdown from './Components/Countdown';

// const Main = styled('div')({
//   background: "green",
//   width: "400px",
//   height: "400px",
//   alignContent: "center",
//   border: "5px solid black"
// });

// const Oclock = styled("div")({
//   display: "flex", 
//   justifyContent: 'center',
//   color: "black"
// });

// const Milliseconds = styled('div')({
//   width: "40px",
//   height: "30px",
//   border: "1px solid black",
//   marginRight: "15px",
//   textAlign: "center"
// });

// const Minuts = styled('div')({
//   width: "40px",
//   height: "30px",
//   border: "1px solid black",
//   marginRight: "15px",
//   textAlign: "center"
// });

// const Seconds = styled('div')({
//   width: "40px",
//   height: "30px",
//   border: "1px solid black",
//   marginRight: "15px",
//   textAlign: "center"
// })

// const MainBtn = styled("div")({
//   padding: "20px",
//   alignItems: "center"
// })

// const BtnStart = styled('button')({
//   color: 'darkslategray',
//   backgroundColor: 'aliceblue',
//   padding: 8,
//   borderRadius: 4,
//   cursor: "pointer",
//   marginRight: "10px"
// });

// const BtnReset = styled('button')({
//   color: 'darkslategray',
//   backgroundColor: 'aliceblue',
//   padding: 8,
//   borderRadius: 4,
//   cursor: "pointer",
// });

function App() {
//   const [time, setTime] = useState({ ms: 0, s: 0, m: 0 });
//   const [running, setRunning] = useState(false);
//   const intervalRef = useRef<number | undefined>(undefined);
//   const prevTimeRef = useRef<number>(0);

//   const start = () => {
//     if (!running) {
//       prevTimeRef.current = Date.now();
//       intervalRef.current = window.setInterval(updateTime, 10);
//       setRunning(true);
//     } else {
//       clearInterval(intervalRef.current);
//       setRunning(false);
//     }
//   };

//   const updateTime = () => {
//     const currentTime = Date.now();
//     const deltaTime = currentTime - prevTimeRef.current;
//     prevTimeRef.current = currentTime;

//     let { ms, s, m } = time;

//     ms += deltaTime;
//     if (ms >= 1000) {
//       s += Math.floor(ms / 1000);
//       ms %= 1000;
//       if (s >= 60) {
//         m += Math.floor(s / 60);
//         s %= 60;
//       }
//     }

//     setTime({ ms, s, m });
//   };

//   const reset = () => {
//     clearInterval(intervalRef.current);
//     setTime({ ms: 0, s: 0, m: 0 });
//     setRunning(false);
//   };

  return (
    // <Main>
    //   <Oclock>
    //     <Minuts>{(time.m >= 10) ? time.m : "0" + time.m}</Minuts>
    //     <Seconds>{(time.s >= 10) ? time.s : "0" + time.s}</Seconds>
    //     <Milliseconds>{(time.ms >= 100) ? time.ms : "0" + time.ms}</Milliseconds>
    //   </Oclock>

    //   <MainBtn>
    //     <BtnStart onClick={start}>{running ? 'Pause' : 'Start'}</BtnStart>
    //     <BtnReset onClick={reset} disabled={running}>Reset</BtnReset>
    //   </MainBtn>
    // </Main>
    <>
    <Timer/>
    <Countdown/>
    </>
  );
}

export default App;
