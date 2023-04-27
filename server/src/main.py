import json
from fastapi import FastAPI
from fastapi.responses import StreamingResponse
from pydantic import BaseModel

# Initialize FastAPI
app = FastAPI()


# Create a Pydantic model to extract the request body which contains a question
class Question(BaseModel):
    question: str


# Define a POST endpoint to receive a question and return the respective answer
@app.post("/ask-question/")
async def ask_question(question: Question):
    # Extract the question from the request body
    question = question.question

    # Convert the question to lowercase
    question = question.lower()

    # Load the appendix file
    with open("appendix.json", "r") as f:
        appendix = json.load(f)

    # Extract the keys from the appendix
    keys = list(appendix.keys())

    # Iterate through the keys and check if the question exists
    for key in keys:
        if key.lower() == question:
            answer = appendix[key]

            # Define a generator function to stream the answer
            async def answer_generator():
                yield answer

            return StreamingResponse(answer_generator())

    return {"Sorry, I don't have the answer for that question."}
