import React, { useState, useEffect, useRef, MouseEvent } from 'react';
import ReactPlayer from 'react-player';
import Slider from '@material-ui/core/Slider';
import { Grid } from '@material-ui/core';

import Play from './Play';
import Pause from './Pause';
import Duration from './Duration';

import MouseHelper from './MouseHelper';

import './index.scss';

interface IProps {
  src: string;
}

const AudioPlayer = (props: IProps) => {
  const { src } = props;
  const [playedPercentage, setPlayedPercentage] = useState(0);
  const [playing, setPlaying] = useState(false);
  const [duration, setDuration] = useState(0);
  const [hoverTime, setHoverTime] = useState<number | null>(0);
  const [hoverTimeVisible, setHoverTimeVisible] = useState(false);

  const audioRef = useRef<ReactPlayer>(null);
  const barRef = useRef<HTMLDivElement>(null);

  const hideHoverTime = () => {
    setHoverTimeVisible(false);
    setHoverTime(0);
  };

  const seek = (e: any, newValue: number | number[]) => {
    if (typeof newValue !== 'number') {
      return;
    }
    setPlayedPercentage(newValue);
    setHoverTime(newValue * duration);

    if (audioRef.current) {
      audioRef.current.seekTo(newValue, 'fraction');
    }
  };

  const handleMouseEnterBar = (e: MouseEvent) => {
    const bar = barRef.current as HTMLDivElement;
    const barWidth = bar.offsetWidth;
    const pos = MouseHelper.getMousePositionInElement(e, bar);
    if (pos < 0) {
      return;
    }
    setHoverTime((duration / barWidth) * pos);
    setHoverTimeVisible(true);
  };

  const handleMouseLeaveBar = (e: MouseEvent) => {
    if (MouseHelper.isLeftMouseHeld(e)) {
      hideHoverTime();
    }
  };

  useEffect(() => {
    const handleMouseUp = (e: Event) => {
      if (barRef.current && !barRef.current.contains(e.target as HTMLElement)) {
        hideHoverTime();
      }
    };

    // handle when seeking audio with mouse cursor out of bar
    document.addEventListener('mouseup', handleMouseUp);

    return () => {
      document.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <ReactPlayer
        url={src}
        ref={audioRef}
        playing={playing}
        style={{
          display: 'none',
        }}
        onDuration={(dur: number) => setDuration(dur)}
        onProgress={(e: { played: number }) => setPlayedPercentage(e.played)}
      />
      <Grid container alignItems="center" className="rhap">
        <div className="rhap__controls">
          {playing ? (
            <Pause handleClick={() => setPlaying(false)} />
          ) : (
            <Play handleClick={() => setPlaying(true)} />
          )}
        </div>
        <div
          className="rhap__progress"
          ref={barRef}
          onMouseMove={handleMouseEnterBar}
          onMouseLeave={handleMouseLeaveBar}
        >
          {audioRef.current ? (
            <span className="rhap__time">
              <Duration seconds={audioRef.current.getCurrentTime()} />
            </span>
          ) : null}

          <Slider
            value={playedPercentage}
            step={0.00000001}
            min={0}
            max={1}
            onChange={seek}
            aria-labelledby="continuous-slider"
          />

          {hoverTimeVisible && (
            <span
              className="rhap__time rhap__time--hover"
              style={{
                left: `${hoverTime ? `${(hoverTime / duration) * 100}%` : 0}`,
              }}
            >
              <Duration seconds={hoverTime} />
            </span>
          )}

          <span className="rhap__time">
            <Duration seconds={duration} />
          </span>
        </div>
      </Grid>
    </>
  );
};

export default AudioPlayer;
