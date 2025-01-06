// import logo from './logo.svg';
import './App.css';
// import { Component } from 'react';
// import LearningComponent from './components/learning-examples/LearningComponent';
// import Counter from './components/counter/Counter';
import TodoApp from './components/todo/TodoApp';
import { useState } from 'react';

function App() {


  const [showTodoApp, setShowTodoApp] = useState(false);

  const handleButtonClick = () => {
    setShowTodoApp(true);
  };

  return (
    <div className="App">
      {!showTodoApp && (
        <>
          <header className="App-header">
            <h1 className="display-4">TodoApp using React and Spring Boot</h1>
            <button className="btn btn-primary" onClick={handleButtonClick}>Go to TodoApp</button>
          </header>
        </>
      )}
      {showTodoApp && (
        <main>
          <TodoApp />
        </main>
      )}
    </div>
  );
}





export default App;

