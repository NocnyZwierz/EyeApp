import React, { useState, useEffect } from 'react';
import { render } from 'react-dom';

const App = () => {
  const [status, setStatus] = useState('off');
  const [time, setTime] = useState(0);
  const [timer, setTimer] = useState(null);

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
  };

  const startTimer = () => {
    setTime(1200);
    setStatus('work');
    setTimer(
      setInterval(() => {
        setTime((time) => time - 1);
      }, 1000)
    );
  };

  useEffect(() => {
    if (time === 0 && status === 'work') {
      playBell();
      setTime(20);
      setStatus('rest');
    } else if (time === 0 && status === 'rest') {
      playBell();
      setTime(1200);
      setStatus('work');
    }
  });

  const stopTimer = () => {
    setTimer(null);
    setTime(0);
    setStatus('off');
  };

  const endProgram = () => {
    window.close();
  };

  const playBell = () => {
    const bell = new Audio('./sounds/bell.wav');
    bell.play();
  };


  return (
    <div>
      <h1>Protect your eyes</h1>
      {status === 'off' && (
        <div>
          <p>
            According to optometrists, in order to save your eyes, you should follow the 20/20/20
            rule. This means you should rest your eyes every 20 minutes for 20 seconds by looking
            more than 20 feet away.
          </p>
          <p>This app will help you track your time and inform you when it's time to rest.</p>
        </div>
      )}
      {status === 'work' && <img src="./images/work.png" alt="Work" />}
      {status === 'rest' && <img src="./images/rest.png" alt="Rest" />}

      {status !== 'off' && <div className="timer">{formatTime(time)}</div>}

      {status === 'off' && <button className="btn" onClick={startTimer}>Start</button>}
      {status !== 'off' && <button className="btn" onClick={stopTimer}>Stop</button>}

      <button className="btn btn-close" onClick={endProgram}>X</button>
    </div>
  );
};

render(<App />, document.querySelector('#app'));
