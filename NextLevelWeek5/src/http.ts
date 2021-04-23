import express, { request, response } from 'express';

import {createServer} from 'http';
import {Server, Socket} from 'socket.io';

import { routes } from './routes';
import './database';
import path from "path";
import cors from 'cors';

const app = express();
const options: cors.CorsOptions = {
    allowedHeaders: [
      'Origin',
      'X-Requested-With',
      'Content-Type',
      'Accept',
      'X-Access-Token',
    ],
    credentials: true,
    methods: 'GET,HEAD,OPTIONS,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
  };
  
  app.use(cors(options))
  
  app.options('*', cors(options));

app.use(express.static(path.join(__dirname, "..", "public")));
app.set("views", path.join(__dirname, "..", "public"));
app.engine("html", require("ejs").renderFile);
app.set("view engine", "html");

app.get("/pages/client", (request, response) =>{
    return response.render("html/client.html")
})

app.get("/pages/admin", (request, response) =>{
  return response.render("html/admin.html")
})

const http = createServer(app); //criando protocolo http
const io =  new Server(http); // criando protocolo websocket

io.on("connection", (socket: Socket) => {
    console.log("se conectou", socket.id);
} )

app.use(express.json());
app.use(routes);

export {http, io}