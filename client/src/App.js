import "./App.css";
import "bulma/css/bulma.min.css";
import { useState } from "react";

const API_URL = "http://localhost:8000/ask-question";

function App() {
  // State variables to store the question and answer respectively
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Function to handle the form submission
  const handleSubmit = async (event) => {
    event.preventDefault(); // Prevent the page from reloading
    setAnswer("Thinking..."); // This is a temporary placeholder
    setIsLoading(true); // Disable the ask button

    try {
      // Send the request to the server's endpoint
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

      // Reset the answer
      setAnswer("");

      // Read the response from the server
      const reader = response.body.getReader();
      let words = [];

      while (true) {
        // Read the next chunk from the response stream
        const { done, value } = await reader.read();
        if (done) break;

        console.log(new TextDecoder().decode(value));

        // Add the chunk to the words array
        words.push(value);
        setAnswer(words.map((word) => new TextDecoder().decode(word)));
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false); // Re-enable the ask button
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
                            <button
                              className="button is-primary"
                              type="submit"
                              disabled={isLoading}
                            >
                              Ask
                            </button>
                          </div>
                        </div>
                      </form>

                      <br />

                      {answer && (
                        <div className="message is-primary">
                          <div className="message-body has-text-left">
                            {answer}
                          </div>
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
