import './App.css';
import React, {useEffect} from "react";
import {ChatGPTForm} from "./ChatGPTForm";
function App() {

    useEffect(() => {
        console.log('%c...foo', 'color:gold')
    }, []);

  return (
    <div className="App">
      <h1>Create Jira Ticket with ChatGPT</h1>

        <ChatGPTForm/>
    </div>
  );
}

export default App;
