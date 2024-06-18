import express from 'express';
import Wallet from '../models/wallet-model';
import walletRepository from '../repositories/wallet-repository';

const walletRouter = express.Router();

walletRouter.post('/wallets', (req, res) => {
    const wallet = req.body as Wallet;
    walletRepository.addNew(wallet, (id) => {
        if (id) {
            res.status(201).send({ id });
        } else {
            res.status(500).send({ error: 'Internal error' });
        }
    });
});

walletRouter.get('/wallets/:id', (req, res) => {
    const id = parseInt(req.params.id);
    walletRepository.getById(id, (wallet) => {
        if (wallet) {
            res.send(wallet);
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    });
});

export default walletRouter;