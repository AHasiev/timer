import React, { useState, useEffect} from 'react';
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
    // Состояния для минут, секунд, оставшегося времени и статуса таймера
    const [initialMinutes, setInitialMinutes] = useState(0);
    const [initialSeconds, setInitialSeconds] = useState(0);
    const [remainingTime, setRemainingTime] = useState(initialMinutes * 60 + initialSeconds);
    const [isRunning, setIsRunning] = useState(false);

    useEffect(() => {
        // Эффект, который выполняется при изменении состояний isRunning и remainingTime
        if (isRunning) {
            if(remainingTime === 0){
                setIsRunning(false)
                return 
            }
            
            // Создание интервала для уменьшения оставшегося времени каждую секунду
            const intervalId = setInterval(() => {
                setRemainingTime(prevTime => prevTime - 1);
            }, 1000);

            // Возвращение функции очистки интервала для уборки при размонтировании компонента
            return () => clearInterval(intervalId);
        } 
    }, [isRunning, remainingTime]);

    // Обработчики изменения значений слайдера, минут и секунд
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

    // Обработчики кнопок "Start/Pause" и "Reset"
    const handleStartPause = () => {
        setIsRunning(prev => !prev);
    };

    const handleReset = () => {
        setIsRunning(false);
        setRemainingTime(initialMinutes * 60 + initialSeconds);
    };

    // Функция для форматирования оставшегося времени в формат "мм:сс"
    const formatTime = () => {
        return `${Math.floor(remainingTime / 60)
            .toString()
            .padStart(2, '0')}:${(remainingTime % 60).toString().padStart(2, '0')}`;
    };

    return (
        <CountdownContainer>
            {/* Контейнер для отображения времени и элементов управления */}
            <TimeInputContainer>
                {/* Слайдер для выбора времени */}
                <Slider
                    min={0}
                    max={60 * 60}
                    step={15}
                    value={remainingTime}
                    onChange={handleSliderChange}
                    disabled={isRunning}
                />
                {/* Поле ввода для минут */}
                <TextField
                    type='number'
                    label='Minutes'
                    value={initialMinutes}
                    onChange={handleMinutesChange}
                    disabled={isRunning}
                />
                {/* Поле ввода для секунд */}
                <TextField
                    type='number'
                    label='Seconds'
                    value={initialSeconds}
                    onChange={handleSecondsChange}
                    disabled={isRunning}
                />
            </TimeInputContainer>
            {/* Контейнер для отображения оставшегося времени и прогресса */}
            <ResultContainer>
                <p>Time remaining: {formatTime()}</p>
                {/* Круговой индикатор прогресса */}
                <CircularProgress
                    variant='determinate'
                    value={(1 - remainingTime / (initialMinutes * 60 + initialSeconds)) * 100}
                />
            </ResultContainer>
            {/* Кнопки "Start/Pause" и "Reset" */}
            <Button variant='outlined' onClick={handleStartPause}>
                {isRunning ? 'Pause' : 'Start'}
            </Button>
            <Button variant='outlined' onClick={handleReset}>
                Reset
            </Button>
        </CountdownContainer>
    );
};

export default Countdown;
