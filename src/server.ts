import express from "express";

const server = express();

server.get("/", (request, response) => {
  return response.send("CORINTHIANS!");
});

export default server;