import "./App.css";
import "bulma/css/bulma.min.css";
import { useState } from "react";

const API_URL = "http://localhost:8000/ask-question";

function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the page from reloading
    setAnswer("Thinking...");

    try {
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          accept: "application/json",
          "content-type": "application/json",
        },
        body: JSON.stringify({
          question: question,
        }),
      });

      setAnswer("");

      const reader = response.body.getReader();
      let words = [];

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;
        words.push(value);
        setAnswer(
          words.map((word) => new TextDecoder().decode(word)).join(" ")
        );
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="App">
      <section className="hero is-fullheight is-primary">
        <div className="hero-body">
          <div className="container">
            <div className="columns is-centered is-vcentered">
              <div className="column is-three-quarters">
                <div className="card">
                  <div className="card-content">
                    <div className="content">
                      <p className="title has-text-centered has-text-dark">
                        Hello there!
                      </p>
                      <form onSubmit={handleSubmit}>
                        <div className="field has-addons">
                          <div className="control is-expanded">
                            <input
                              className="input"
                              type="text"
                              placeholder="Ask me a question..."
                              id="questionInput"
                              onChange={(event) => {
                                setQuestion(event.target.value);
                              }}
                            ></input>
                          </div>
                          <div className="control">
                            <button className="button is-primary" type="submit">
                              Ask
                            </button>
                          </div>
                        </div>
                      </form>

                      <br />

                      {answer && (
                        <div className="message is-primary">
                          <div className="message-body">{answer}</div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
