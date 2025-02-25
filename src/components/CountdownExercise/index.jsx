import { useState, useEffect } from 'react';

const CountdownTimer = ({ exercise, goToScreen }) => {
    // states defined
    const [time, setTime] = useState(0);
    const [isActive, setIsActive] = useState(false);
    const [inputValue, setInputValue] = useState("");

    //
    useEffect(() => {
        let interval = null;

        // if the timer is active and the time is greater than 0, set the interval time that runs every 1000ms
        if (isActive && time > 0) {
            interval = setInterval(() => {
                // decreases the time by 1 second
                setTime((prevTime) => prevTime - 1);
            }, 1000);
            // if the timer is not active and the time is not equal to 0, clear the interval.
        } else if (!isActive && time !== 0) {
            clearInterval(interval);
        }
        // return the clear interval function to stop the timer when needed
        return () => clearInterval(interval);
    }, [isActive, time]); // these run when isActive or time changes

    // when the user types into the field, get the value entered and update the value.
    const handleInputChange = (event) => {
        const value = event.target.value;
        setInputValue(value);
    };

    // function to start the countdown timer.
    const startTimer = () => {
        // convert the input value into a number
        const parsedTime = parseInt(inputValue, 10);
        // if the parsedTime is not invalid (not a number), then set the time and change the active flag to true.
        if (!isNaN(parsedTime)) {
            setTime(parsedTime);
            setIsActive(true);
            setInputValue("");
        }
    };

    // stops the timer by changing the active flag to false
    const stopTimer = () => {
        setIsActive(false);
    };

    // resets the timer by changing the active flag to false and setting the time to 0.
    const resetTimer = () => {
        setIsActive(false);
        setTime(0);
    };

    // components displayed as html
    return (
        <div className="countdown">
            <button className="back_btn" onClick={() => goToScreen("home")}> &lt; </button>
            <div className="countdown_header">
                <h2>{exercise}</h2>
                <h3>Countdown Timer</h3>
            </div>
            <div className="time">
                <h2>{time > 0 ? "Time left:" : "Time is up!"}</h2>
                <h2>{time}</h2>
            </div>
            <div className="input">
                <input type="number" value={inputValue} onChange={handleInputChange} placeholder="Enter time in seconds"></input>
            </div>
            <div className='countdown_controls'>
                <button onClick={startTimer}>Start</button>
                <button onClick={stopTimer}>Stop</button>
                <button onClick={resetTimer}>Reset</button>
            </div>

        </div>
    );
};

export default CountdownTimer;
