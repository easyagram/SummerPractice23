import styles from "./Timer.module.css";
import "../../styles/Main.module.css";

import alarmSound from "../../sounds/sound.mp3";

import React, { useState, useEffect } from "react";

const Timer = () => {
    const [minutes, setMinutes] = useState(0);
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);

    const audioFile = new Audio(alarmSound);

    const startTimer = () => {
        setIsActive(true);
        document.body.style.backgroundColor = "#0e6451";
    };

    const stopTimer = () => {
        setIsActive(false);
        document.body.style.backgroundColor = "#ffca61";
        audioFile.pause();
        audioFile.currentTime = 0;
    };

    const resetTimer = () => {
        setIsActive(false);
        setMinutes(0);
        setSeconds(0);
        document.body.style.backgroundColor = "#dedede";
        audioFile.pause();
        audioFile.currentTime = 0;
    };

    useEffect(() => {
        let interval = null;

        if (isActive) {
            interval = setInterval(() => {
                if (seconds === 0) {
                    if (minutes === 0) {
                        clearInterval(interval);
                        document.body.style.backgroundColor = "#b30909";
                        audioFile.play();
                    } else {
                        setMinutes(minutes - 1);
                        setSeconds(59);
                    }
                } else {
                    setSeconds(seconds - 1);
                }
            }, 1000);
        }

        return () => clearInterval(interval);
    }, [isActive, minutes, seconds]);

    useEffect(() => {
        const handleBeforeUnload = () => {
            localStorage.setItem('timerState', JSON.stringify({ minutes, seconds }));
        };

        window.addEventListener('beforeunload', handleBeforeUnload);

        return () => {
            window.removeEventListener('beforeunload', handleBeforeUnload);
        };
    }, [minutes, seconds]);

    useEffect(() => {
        const savedTimerState = localStorage.getItem('timerState');

        if (savedTimerState) {
            const { minutes: savedMinutes, seconds: savedSeconds } = JSON.parse(savedTimerState);
            setMinutes(savedMinutes);
            setSeconds(savedSeconds);
        }
    }, []);

    const handleMinutesChange = (event) => {
        if (!isActive) {
            setMinutes(parseInt(event.target.value));
        }
    };
    const handleSecondsChange = (event) => {
        if (!isActive) {
            setSeconds(parseInt(event.target.value));
        }
    };

    return (
        <section className={styles.timer}>
            <div className={styles.timer__block}>
                <div className={styles.timer__container}>
                    <div className={styles.timer__title}>
                        <span>
                            Таймер Онлайн <br></br>
                        </span>
                    </div>
                    <div className={styles.timer__content}>
                        <div className={styles.timer__inner_container}>
                        <div className={styles.input_container}>
                            <div className={styles.timer__input}>
                                <input
                                    type="number"
                                    value={minutes}
                                    onChange={handleMinutesChange}
                                    disabled={isActive}
                                    min="0"
                                />
                                <span> мин </span>
                            </div>
                            <div className={styles.timer__input}>
                                <input
                                    type="number"
                                    value={seconds}
                                    onChange={handleSecondsChange}
                                    disabled={isActive}
                                    min="0"
                                    max="59"
                                />
                            </div>
                            <span> сек </span>
                            </div>
                            <div className={styles.timer__btns}>
                                <button onClick={startTimer} disabled={isActive}>
                                    Старт
                                </button>
                                <button onClick={stopTimer} disabled={!isActive}>
                                    Стоп
                                </button>
                                <button onClick={resetTimer}>
                                    Сброс
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

    );
};

export default Timer;