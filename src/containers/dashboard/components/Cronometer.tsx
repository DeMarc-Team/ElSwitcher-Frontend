import React, { useEffect, useState } from "react";
import "./CronometerCss.css"; // Asegúrate de agregar estilos

const Cronometer = ({ initialSeconds, onComplete }) => {
    const [seconds, setSeconds] = useState(initialSeconds);

    useEffect(() => {
        if (seconds > 0) {
            const timerId = setInterval(() => {
                setSeconds((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(timerId);
        } else {
            onComplete();
        }
    }, [seconds, onComplete]);

    const percentage = (seconds / initialSeconds) * 100;

    return (
        <div className="cronometro-container">
            <svg className="cronometro" viewBox="0 0 36 36">
                <path
                    className="cronometro-circle-bg"
                    d="M18 2.0845
                       a 15.9155 15.9155 0 1 0 0 31.831
                       a 15.9155 15.9155 0 1 0 0 -31.831"
                />
                <path
                    className="cronometro-circle"
                    strokeDasharray={`${percentage} 100`}
                    d="M18 2.0845
                       a 15.9155 15.9155 0 1 0 0 31.831
                       a 15.9155 15.9155 0 1 0 0 -31.831"
                />
            </svg>
            <div className="cronometro-time">{seconds}s</div>
        </div>
    );
};

export default Cronometer;
