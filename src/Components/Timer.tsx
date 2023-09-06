import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

// Создание стилизованного контейнера для таймера
const TimerContainer = styled("div")({
    textAlign: "center"
})

const Timer = () => {
    // Состояние для хранения миллисекунд таймера
    const [milliSeconds, setMilliseconds] = useState(0);
    // Состояние для определения, запущен ли таймер
    const [isRunning, setIsRunning] = useState(false);

    // Эффект, который срабатывает при изменении состояния isRunning
    useEffect(() => {
        let intervalId: NodeJS.Timeout;

        // Если таймер запущен, создаем интервал, который каждые 10 миллисекунд
        // увеличивает значение миллисекунд
        if (isRunning) {
            intervalId = setInterval(() => {
                setMilliseconds(prevMilliseconds => prevMilliseconds + 10);
            }, 10);
        }

        // При завершении работы компонента или изменении состояния isRunning,
        // очищаем интервал
        return () => {
            clearInterval(intervalId);
        };
    }, [isRunning]);

    // Обработчик для кнопки "Start/Pause"
    const handleStartStop = () => {
        // Изменяем состояние isRunning на противоположное
        setIsRunning(prevstate => !prevstate);
    };

    // Обработчик для кнопки "Reset"
    const handleReset = () => {
        // Сбрасываем миллисекунды и останавливаем таймер
        setMilliseconds(0);
        setIsRunning(false);
    };

    // Форматирование времени в формат "мм:сс.мс"
    const formatTime = (milliseconds: number) => {
        const minutes = Math.floor(milliseconds / 60000);
        const seconds = Math.floor((milliseconds % 60000) / 1000);
        const ms = milliseconds % 1000;

        return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}.${ms
            .toString()
            .padStart(2, '0')}`;
    };

    return (
        <TimerContainer>
            {/* Заголовок таймера */}
            <Typography variant='h4'>Timer</Typography>
            {/* Отображение отформатированного времени */}
            <Typography variant='h5'>{formatTime(milliSeconds)}</Typography>
            {/* Кнопка "Start/Pause", текст меняется в зависимости от состояния таймера */}
            <Button variant='contained' onClick={handleStartStop}>
                {isRunning ? 'Pause' : 'Start'}
            </Button>
            {/* Кнопка "Reset" */}
            <Button variant='contained' onClick={handleReset}>
                Reset
            </Button>
        </TimerContainer>
    );
};

export default Timer;
