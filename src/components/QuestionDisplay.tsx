// QuestionDisplay.tsx
import React from "react";
import { EditableMathField } from "react-mathquill";
import { Option, Question } from "../store/quizStore";

interface Props {
  question: Question;
}

const QuestionDisplay: React.FC<Props> = ({ question }) => {
  return (
    <div className="question-container">
      <div className="question">
        <p className="font-semibold text-2xl">Question:</p>
        <EditableMathField latex={question.title} />
      </div>

      <p className="font-semibold text-2xl">Choices:</p>
      <ul>
        {question.options.map((choice: Option, index: number) => (
          <li key={index} className="answer">
            <EditableMathField latex={choice.title} />
            {choice.correct && <span> (Correct)</span>}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionDisplay;
