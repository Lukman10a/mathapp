// quizStore.ts
import { create, SetState } from "zustand";

export interface Option {
  id: number;
  title: string;
  correct: boolean;
}

export interface Question {
  id: number;
  title: string;
  options: Option[];
}

interface QuizStore {
  questions: Question[];
  setQuestions: (questions: Question[]) => void;
  addQuestion: (question: Question) => void;
  removeQuestion: (questionId: number) => void;
  setQuestionTitle: (questionId: number, title: string) => void;
  addOption: (questionId: number, option: Option) => void;
  removeOption: (questionId: number, optionId: number) => void;
  setOptionTitle: (questionId: number, optionId: number, title: string) => void;
  setCorrectOption: (questionId: number, correctOptionId: number) => void;
}

const useQuizStore = create<QuizStore>((set: SetState<QuizStore>) => ({
  questions: [
    {
      id: 1,
      title: "Solve the following equation: x^2 - 4 = 0",
      options: [
        { id: 1, title: " x = -2, 2", correct: true },
        { id: 2, title: " x = -2 ", correct: false },
        { id: 3, title: " x = 2 ", correct: false },
      ],
    },
  ],
  setQuestions: (questions) => set({ questions }),
  addQuestion: (question) =>
    set((state) => ({ questions: [...state.questions, question] })),
  removeQuestion: (questionId) =>
    set((state) => ({
      questions: state.questions.filter((q) => q.id !== questionId),
    })),
  setQuestionTitle: (questionId, title) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === questionId ? { ...q, title } : q
      ),
    })),
  addOption: (questionId, option) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === questionId ? { ...q, options: [...q.options, option] } : q
      ),
    })),
  removeOption: (questionId, optionId) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === questionId
          ? { ...q, options: q.options.filter((opt) => opt.id !== optionId) }
          : q
      ),
    })),
  setOptionTitle: (questionId, optionId, title) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) =>
                opt.id === optionId ? { ...opt, title } : opt
              ),
            }
          : q
      ),
    })),
  setCorrectOption: (questionId, correctOptionId) =>
    set((state) => ({
      questions: state.questions.map((q) =>
        q.id === questionId
          ? {
              ...q,
              options: q.options.map((opt) => ({
                ...opt,
                correct: opt.id === correctOptionId,
              })),
            }
          : q
      ),
    })),
}));

export default useQuizStore;
