import { useState } from "react";

function Home({ selectMode, mode, goToScreen }) {
    const [error, setError] = useState("");

    function handleModeSelection(selectedMode) {
        selectMode(selectedMode); // Update mode state
        setError("")
    }

    // function to set an error if the user presses start before selecting duration or repetition
    function manageStart(exerciseKey) {
        if (!mode) {
            setError("Please select a mode before starting.");
        } else {
            setError(""); // clears error
            goToScreen(mode, exerciseKey); // let the user continue if a mode is selected
        }
    }

    // object created for exercise descriptions in each mode for varying screens.
    const exerciseDescriptions = {
        Running: {
            duration: "Track how long you can run with a timer.",
            repetition: "Count how many laps you complete during your run.",
            countdown: "Run for the set time duration and see how far you can go.",
        },
        PushUps: {
            duration: "See how long you can keep doing push-ups with a timer.",
            repetition: "Count your push-ups to track progress over time.",
            countdown: "Complete as many push-ups as possible before the timer runs out.",
        },
        Plank: {
            duration: "Hold your plank and measure your endurance with a timer.",
            repetition: "Track how many plank reps you can complete.",
            countdown: "Hold your plank position until the countdown timer reaches zero.",
        },
        Squats: {
            duration: "Hold your plank and measure your endurance with a timer.",
            repetition: "Track how many plank reps you can complete.",
            countdown: "Set a time limit and squat until the timer runs out.",
        },
    };

    return (
        <div className="home">
            <div className="home_header">
                <h1>Hello,</h1>
                <p>Choose an exercise and your method.</p>

                {/* buttons for the mode that change color when selected */}
                <button onClick={() => handleModeSelection("duration")} id="duration_button" className={mode === "duration" ? "selected" : ""}>Duration</button>
                <button onClick={() => handleModeSelection("repetition")} id="repetition_button" className={mode === "repetition" ? "selected" : ""}> Repetition</button>
                <button onClick={() => handleModeSelection("countdown")} id="countdown_button" className={mode === "countdown" ? "selected" : ""}> Countdown</button>
                {/* display an error message if there is one */}
                {error && <p style={{ color: "#00ffbf" }}>{error}</p>}
            </div>

            {/* a map is created to loop through each exercise and render each one */}
            <div className="exercise-options">
                {[
                    { name: "Running", key: "Running" },
                    { name: "PushUps", key: "PushUps" },
                    { name: "Plank", key: "Plank" },
                    { name: "Squats", key: "Squats" }
                ].map((exercise) => (
                    <div key={exercise.key} className={exercise.key}>
                        <div className="exercise_box--text">
                            <h1>{exercise.name}</h1>
                            {/* exercise descriptions update based on the exercises and mode */}
                            <p> {mode && exerciseDescriptions[exercise.name]?.[mode]
                                ? exerciseDescriptions[exercise.name][mode]
                                : "Select duration, repetition or countdown to see more details!"}</p>
                            {/* start button calls manageStart with exercise key */}
                        </div>
                        <div className="start-container">
                            <button className="start-button" onClick={() => manageStart(exercise.key)}>Start</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
