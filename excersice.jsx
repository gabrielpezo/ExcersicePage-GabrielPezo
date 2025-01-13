import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const questions = [
    {
        sentence: "She ___ to school every day.",
        options: ["go", "goes", "gone", "going"],
        correct: "goes"
    },
    {
        sentence: "They ___ football on weekends.",
        options: ["play", "plays", "playing", "played"],
        correct: "play"
    },
    {
        sentence: "He ___ early in the morning.",
        options: ["wake", "wakes", "waking", "woke"],
        correct: "wakes"
    },
    {
        sentence: "I ___ coffee every day.",
        options: ["drink", "drinks", "drank", "drinking"],
        correct: "drink"
    },
    {
        sentence: "We ___ to the park on Sundays.",
        options: ["go", "going", "gone", "went"],
        correct: "go"
    }
];

const QuizApp = () => {
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [score, setScore] = useState(0);
    const [showScore, setShowScore] = useState(false);
    const [feedback, setFeedback] = useState(null);

    const handleAnswerClick = (selectedOption) => {
        const currentQuestion = questions[currentQuestionIndex];
        if (selectedOption === currentQuestion.correct) {
            setFeedback({ message: "Correct!", color: "green" });
            setScore(score + 1);
        } else {
            setFeedback({
                message: `Incorrect! The correct answer is "${currentQuestion.correct}".`,
                color: "red"
            });
        }

        setTimeout(() => {
            setFeedback(null);
            if (currentQuestionIndex < questions.length - 1) {
                setCurrentQuestionIndex(currentQuestionIndex + 1);
            } else {
                setShowScore(true);
            }
        }, 1500);
    };

    const restartQuiz = () => {
        setCurrentQuestionIndex(0);
        setScore(0);
        setShowScore(false);
        setFeedback(null);
    };

    if (showScore) {
        return (
            <div style={{ textAlign: "center", marginTop: "20px" }}>
                <h1>You scored {score} out of {questions.length}!</h1>
                <button onClick={restartQuiz}>Restart Quiz</button>
            </div>
        );
    }

    const currentQuestion = questions[currentQuestionIndex];

    return (
        <div style={{ textAlign: "center", marginTop: "20px" }}>
            <h1>English Quiz</h1>
            <div>
                <p>{currentQuestion.sentence}</p>
                <div>
                    {currentQuestion.options.map((option, index) => (
                        <button
                            key={index}
                            style={{ margin: "5px", padding: "10px 20px" }}
                            onClick={() => handleAnswerClick(option)}
                        >
                            {option}
                        </button>
                    ))}
                </div>
                {feedback && (
                    <p style={{ color: feedback.color, fontWeight: "bold", marginTop: "20px" }}>
                        {feedback.message}
                    </p>
                )}
            </div>
        </div>
    );
};

ReactDOM.render(<QuizApp />, document.getElementById('root'));