import express from "express";
import StockWallet from "../models/stock-wallet-model";
import stockWalletRepository from "../repositories/stock-wallet-repository";

const stockWalletRouter = express.Router();

stockWalletRouter.post("/stock-wallets", (req, res) => {
    const stockWallet = req.body as StockWallet;
    stockWalletRepository.addNew(stockWallet, (id) => {
        if (id) {
            res.status(201).send({ id });
        } else {
            res.status(500).send({ error: "Internal error" });
        }
    });
});

export default stockWalletRouter;