import express from 'express';
import Transaction from '../models/transaction-model';
import transactionRepository from '../repositories/transaction-repository';

const transactionRouter = express.Router();

transactionRouter.post('/transactions', (req, res) => {
    const transaction = req.body as Transaction;
    transactionRepository.addNew(transaction, (id) => {
        if (id) {
            res.status(201).send({ id });
        } else {
            res.status(500).send({ error: 'Internal error' });
        }
    });
});

export default transactionRouter;