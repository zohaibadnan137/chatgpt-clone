# ChatGPT Clone 
This is my attempt at a recruitment challenge for one of the companies that I've applied at. The main goal was to use server-sent events to create a question and answer interface that resembles ChatGPT.

https://user-images.githubusercontent.com/82387424/236318274-32f2541a-531e-48d9-96ea-193832c627b6.mp4

## Try it out!
Clone the repository on your machine. 
```
git clone https://github.com/zohaibadnan137/chatgpt-clone.git
```
Open a terminal window, and navigate to the ```server``` directory. Install the required dependencies.
```
cd server
pip install requirements.txt
```
Navigate to the ```src``` directory, and start the server.
```
cd src
uvicorn main:app
```
Open a new terminal window, and navigate to the ```client``` directory. Install the required dependencies.
```
cd client
npm install
```
Start the client.
```
npm start
```
Open your browser, and navigate to ```http://localhost:3000/```.
