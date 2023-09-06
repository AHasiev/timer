import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { Slider, TextField, Button, CircularProgress } from '@mui/material';


const CountdownContainer = styled.div`
    text-align: center;
`;

const TimeInputContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 20px;
`;

const ResultContainer = styled.div`
    margin-top: 20px;
`;

const Countdown = () => {
    const [initialMinutes, setInitialMinutes] = useState(0);
    const [initialSeconds, setInitialSeconds] = useState(0);
    const [remainingTime, setRemainingTime] = useState(initialMinutes * 60 + initialSeconds);
    const [isRunning, setIsRunning] = useState(false);

    // const audioRef = new Audio ("https://zvukitop.com/wp-content/uploads/2021/04/kogda-vremya-vyshlo-frfrc.mp3")

    useEffect(() => {
        if (isRunning && remainingTime >= 0) {
            const intervalId = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);

            return () => clearInterval(intervalId);
        }
    }, [isRunning, remainingTime]);

    // @ts-ignore
    const handleSliderChange = (_, newValue) => {
        setInitialMinutes(Math.floor(newValue / 60));
        setInitialSeconds(newValue % 60);
        setRemainingTime(newValue);
    };
    // @ts-ignore
    const handleMinutesChange = e => {
        const minutes = parseInt(e.target.value);
        if (!isNaN(minutes) && minutes <= 720) {
            setInitialMinutes(minutes);
            setRemainingTime(minutes * 60 + initialSeconds);
        }
    };
    // @ts-ignore
    const handleSecondsChange = e => {
        const seconds = parseInt(e.target.value);
        if (!isNaN(seconds) && seconds < 60) {
            setInitialSeconds(seconds);
            setRemainingTime(initialMinutes * 60 + seconds);
        }
    };

    const handleStartPause = () => {
        setIsRunning(prev => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        setRemainingTime(initialMinutes * 60 + initialSeconds);
    };

    const formatTime = () => {
        return `${Math.floor(remainingTime / 60)
            .toString()
            .padStart(2, '0')}:${(remainingTime % 60).toString().padStart(2, '0')}`;
    };

    return (
        <CountdownContainer>
            <TimeInputContainer>
                <Slider
                    min={0}
                    max={60 * 60}
                    step={15}
                    value={remainingTime}
                    onChange={handleSliderChange}
                    disabled={isRunning}
                />
                <TextField
                    type='number'
                    label='Minutes'
                    value={initialMinutes}
                    onChange={handleMinutesChange}
                    disabled={isRunning}
                />
                <TextField
                    type='number'
                    label='Seconds'
                    value={initialSeconds}
                    onChange={handleSecondsChange}
                    disabled={isRunning}
                />
            </TimeInputContainer>
            <ResultContainer>
                <p>Time remaining: {formatTime()}</p>
                <CircularProgress
                    variant='determinate'
                    value={(1 - remainingTime / (initialMinutes * 60 + initialSeconds)) * 100}
                />
            </ResultContainer>
            <Button variant='outlined' onClick={handleStartPause} disabled={remainingTime === 0}>
                {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button variant='outlined' onClick={handleReset} disabled={remainingTime === 0}>
                Reset
            </Button>

            {/* <audio ref={audioRef} controls>
                <source src='../1580.mp3' type='audio/mpeg' />
                <track kind='captions' label='No captions available' />
            </audio> */}
        </CountdownContainer>
    );
};

export default Countdown;
