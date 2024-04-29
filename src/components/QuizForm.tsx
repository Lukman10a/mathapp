// QuizForm.tsx
import { FormEvent } from "react";
import { EditableMathField } from "react-mathquill";

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
    alert("A name was submitted: " + JSON.stringify(questions));
  };

  const addClick = () => {
    const newId = questions.length ? questions[questions.length - 1].id + 1 : 1;
    addQuestion({ id: newId, title: "", options: [] });
  };

  return (
    <div className="quiz-container">
      <form className="quiz-form" onSubmit={handleSubmit}>
        {questions.map((question) => (
          <div className="question-container" key={question.id}>
            <EditableMathField
              className="question-input"
              latex={question.title}
              onChange={(mathField) => {
                handleQuestionSubmit(question.id, mathField.latex());
              }}
            />
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
                  className="bg-red-500 p-3 rounded-md text-white "
                  onClick={() => removeQuestion(question.id)}
                >
                  Remove Question
                </button>
                <button
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
      {
        <div>
          <h3 className="font-bold text-center text-4xl my-3">Question List</h3>
          {questions.map((question) => (
            <QuestionDisplay question={question} key={question.id} />
          ))}
        </div>
      }
    </div>
  );
}

export default QuizForm;
