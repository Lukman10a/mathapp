import "./App.css";
import { addStyles } from "react-mathquill";
import QuizForm from "./components/QuizForm";
import Navbar from "./components/navbar";

addStyles();

function App() {
  return (
    <>
      <Navbar />
      <main className="my-2 px-10">
        <QuizForm />
      </main>
    </>
  );
}

export default App;
