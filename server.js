import 'dotenv/config'
import path from "path";
import express from "express";
import cors from 'cors';
import { fileURLToPath } from "url";
import { createServer } from "http";
import { ChatOpenAI }  from "langchain/chat_models/openai";
import { HumanMessage, SystemMessage } from "langchain/schema";
import models from "./models.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let openAIChats = {};

const app = express();

app.use(cors())
app.use(express.static("public/"));
app.use(express.json());
app.use(function(err, req, res, next) {
  err.message;
  next(err);
});

async function promptAI(socketId, model, message){
  // console.log('socketId:', socketId, 'Model:', model, 'Message: ', message);
  if(!openAIChats[socketId]){
    if(process.env.OPENAI_API_KEY){
      openAIChats[socketId] = new ChatOpenAI({ openAIApiKey: process.env.OPENAI_API_KEY, temperature: 0.7 });
    }
  }
  // console.log('\n\n\n## AI Agent:', model, models[model]);
  let prefixLimits = '';
  if(model == 'Mixture of Experts'){
    prefixLimits = 'You must reply in less than 100 words:\n';
  }
  const response = await openAIChats[socketId].call([
    new SystemMessage(
      models[model]
    ),
    new HumanMessage(
      prefixLimits + message
    ),
  ]);
  // console.log('\n\n### Response: ', response.content);
  return response.content;
}

app.get("/", function (req, res) {
  res.sendFile(__dirname + "/index.html");
});

app.get("/chat", async (req, res) => {
  // Respond with error if no API Key set
  if(!process.env.OPENAI_API_KEY){
    res.status(500).send({ err: 'No OpenAI API Key set in the .env file' });
    return;
  }
  let model = req.query.model;
  let message = req.query.message;
  let socketId = req.query.socketId;
  console.log('message',message);

  try {
    let response = await promptAI(socketId, model, message);

    res.send({ response });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message ? err.message : err });
  }
});

app.post("/chat", express.json(), async (req, res) => {
  // Respond with error if no API Key set
  if(!process.env.OPENAI_API_KEY){
    res.status(500).send({ err: 'No OpenAI API Key set in the .env file' });
    return;
  }
  let model = req.query.model;
  let message = req.body.message;
  let socketId = req.query.socketId;
  // console.log('model:', model);
  // console.log('req.body:', req.body);
  // console.log('message',message);

  try {
    let response = await promptAI(socketId, model, message);

    res.send({ response });
  } catch (err) {
    console.log(err);
    res.status(500).send({ err: err.message ? err.message : err });
  }
});

const httpServer = createServer(app);

console.log('Starting Server on Port 3000');
httpServer.listen(3000);
console.log('Running');