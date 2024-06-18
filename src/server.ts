import express from "express";
import cors from "cors";
import stockRouter from "./routers/stock-router";
import stockWalletRouter from "./routers/stock-wallet-router";
import walletRouter from "./routers/wallet-router";
import userRouter from "./routers/user-router";
import transactionRouter from "./routers/trasaction-router";


const server = express();
server.use(cors());
server.use(express.json());

server.use("/api",[stockRouter, stockWalletRouter, walletRouter, userRouter, transactionRouter])

server.get("/", (request, response) => {
  return response.send("CORINTHIANS!");
});

server.use((req, res) => {
  res.status(404);
});

export default server;