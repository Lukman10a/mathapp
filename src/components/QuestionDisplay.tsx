// QuestionDisplay.tsx
import React, { useState } from "react";
// import { EditableMathField } from "react-mathquill";
import { Option, Question } from "../store/quizStore";
import { MathJaxHtml } from "mathjax3-react";

interface Props {
  question: Question;
}

const QuestionDisplay: React.FC<Props> = ({ question }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  const handleOptionSelect = (optionId: number) => {
    setSelectedOption(optionId);
  };

  return (
    <div className="question-container">
      <div className="question">
        <p className="font-semibold text-2xl">Question:</p>
        <MathJaxHtml html={`$$ ${question.title} $$`} />
        {/* <MathJaxFormula formula={`$$ ${question.title} $$`} /> */}
        {/* <EditableMathField latex={question.title} /> */}
      </div>

      <p className="font-semibold text-2xl">Choices:</p>
      <ul>
        {question.options.map((choice: Option, index: number) => (
          <li key={index} className="answer">
            <label className="flex items-center gap-4 ">
              <input
                type="checkbox"
                checked={selectedOption === choice.id}
                onChange={() => handleOptionSelect(choice.id)}
              />
              <MathJaxHtml html={choice.title} />
              {/* <EditableMathField latex={choice.title} /> */}
              {choice.correct && <span> (Correct)</span>}
            </label>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default QuestionDisplay;
