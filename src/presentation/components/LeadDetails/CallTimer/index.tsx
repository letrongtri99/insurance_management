import React, { useEffect, useState } from 'react';
import { millisToMinutesAndSeconds } from 'shared/helper/utilities';

let callTimer: any = null;
const ONE_SECOND = 1000;

const CallTimer = () => {
  const [timer, setTimer] = useState(0);

  useEffect(() => {
    callTimer = setInterval(() => {
      setTimer((prevTimer: number) => prevTimer + ONE_SECOND);
    }, ONE_SECOND);
    return () => clearInterval(callTimer);
  }, []);

  return <div>{millisToMinutesAndSeconds(timer)}</div>;
};

export default CallTimer;
