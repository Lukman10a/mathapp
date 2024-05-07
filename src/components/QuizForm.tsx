// QuizForm.tsx
import { ChangeEvent, FormEvent, useEffect, useRef, useState } from "react";
import { EditableMathField } from "react-mathquill";
import "mathlive";

import { MathfieldElement } from "mathlive";

import useQuizStore from "../store/quizStore";
import QuestionDisplay from "./QuestionDisplay";

// inserts the required css to the <head> block.
// you can skip this, if you want to do that by yourself.

function QuizForm() {
  const questions = useQuizStore((state) => state.questions);
  const setQuestions = useQuizStore((state) => state.setQuestions);
  const addQuestion = useQuizStore((state) => state.addQuestion);
  const removeQuestion = useQuizStore((state) => state.removeQuestion);
  const setQuestionTitle = useQuizStore((state) => state.setQuestionTitle);
  const addOption = useQuizStore((state) => state.addOption);
  const removeOption = useQuizStore((state) => state.removeOption);
  const setOptionTitle = useQuizStore((state) => state.setOptionTitle);
  const setCorrectOption = useQuizStore((state) => state.setCorrectOption);

  const [showGeneratedQuestions, setShowGeneratedQuestions] = useState(false);

  const handleQuestionSubmit = (questionId: number, title: string) => {
    setQuestionTitle(questionId, title);
  };

  const handleOptionSubmit = (
    questionId: number,
    optionId: number,
    title: string
  ) => {
    setOptionTitle(questionId, optionId, title);
  };

  const handleCorrectOptionSelect = (questionId: number, optionId: number) => {
    setCorrectOption(questionId, optionId);
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setQuestions(questions);
    console.log("A question was submitted: " + JSON.stringify(questions));
    setShowGeneratedQuestions(true);
  };

  const addClick = () => {
    const newId = questions.length ? questions[questions.length - 1].id + 1 : 1;
    addQuestion({ id: newId, title: "", options: [] });
  };

  const mf = useRef<MathfieldElement>(null);

  useEffect(() => {
    if (mf.current) {
      // Read more about customizing the mathfield: https://cortexjs.io/mathlive/guides/customizing/
      mf.current.smartFence = true;

      // This could be an `onInput` handler, but this is an alternative
      // Add event listener to math-field
      mf.current.addEventListener("input", (evt) => {
        // When the return key is pressed, play a sound
        if ((evt as InputEvent).inputType === "insertLineBreak") {
          const mathField = evt.target as MathfieldElement;
          mathField.executeCommand("plonk");
        }
      });
    }
  }, []);

  return (
    <div className="quiz-container">
      {showGeneratedQuestions === false && (
        <form className="quiz-form" onSubmit={handleSubmit}>
          {questions.map((question) => (
            <div className="question-container" key={question.id}>
              <math-field
                class="question-input w-full border-2 border-blue-400"
                ref={mf}
                value={question.title}
                onInput={(evt: ChangeEvent<MathfieldElement>) =>
                  handleQuestionSubmit(question.id, evt.target.value)
                }
              />

              {/* <EditableMathField
              className="question-input"
              latex={question.title}
              onChange={(mathField) => {
                handleQuestionSubmit(question.id, mathField.latex());
              }}
            /> */}
              <div className="options-container">
                {question.options.map((option) => (
                  <div className="option-container" key={option.id}>
                    <EditableMathField
                      className="option-input"
                      latex={option.title}
                      onChange={(mathField) => {
                        handleOptionSubmit(
                          question.id,
                          option.id,
                          mathField.latex()
                        );
                      }}
                    />
                    <div className="flex  gap-3">
                      <button
                        type="button"
                        className="bg-red-500 text-white px-2 rounded-sm"
                        onClick={() => removeOption(question.id, option.id)}
                      >
                        Remove Option
                      </button>
                      <label className="flex gap-2 items-center">
                        <input
                          type="checkbox"
                          checked={option.correct}
                          onChange={() =>
                            handleCorrectOptionSelect(question.id, option.id)
                          }
                        />
                        {option.correct && <span>Correct</span>}
                      </label>
                    </div>
                  </div>
                ))}
                <button
                  type="button"
                  className="add-option-button"
                  onClick={() =>
                    addOption(question.id, {
                      id: Date.now(),
                      title: "",
                      correct: false,
                    })
                  }
                >
                  Add Option
                </button>
                <div className="my-2 space-x-3">
                  <button
                    type="button"
                    className="bg-red-500 p-3 rounded-md text-white "
                    onClick={() => removeQuestion(question.id)}
                  >
                    Remove Question
                  </button>
                  <button
                    type="button"
                    className="bg-blue-500 p-3 rounded-md text-white"
                    onClick={addClick}
                  >
                    Add Question
                  </button>
                </div>
              </div>
            </div>
          ))}

          <button type="submit" className="bg-black text-white  p-3 rounded-md">
            Submit
          </button>
        </form>
      )}
      {showGeneratedQuestions === true && (
        <div>
          <div className="flex gap-6 justify-between mb-3">
            <button
              onClick={() => setShowGeneratedQuestions(false)}
              className="bg-black text-white p-2 rounded-md"
            >
              Go Back
            </button>
            <h3 className="font-bold text-center text-4xl my-3">
              Question List
            </h3>
            <div></div>
          </div>

          {questions.map((question) => (
            <QuestionDisplay question={question} key={question.id} />
          ))}
        </div>
      )}
    </div>
  );
}

export default QuizForm;
