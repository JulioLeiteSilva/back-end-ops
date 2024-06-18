import express from 'express';
import Stock from '../models/stock-model';
import stockRepository from '../repositories/stock-repository';

const stockRouter = express.Router();

stockRouter.post('/stocks', (req, res) => {
    const stock = req.body as Stock;
    stockRepository.addNew(stock, (id) => {
        if (id) {
            res.status(201).send({ id });
        } else {
            res.status(500).send({ error: 'Internal error' });
        }
    });
});

stockRouter.get('/stocks', (_req, res) => {
    stockRepository.getAll((stocks) => {
        res.send(stocks);
    });
});

stockRouter.get('/stocks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    stockRepository.getById(id, (stock) => {
        if (stock) {
            res.send(stock);
        } else {
            res.status(404).send({ error: 'Stock not found' });
        }
    });
});

stockRouter.put('/stocks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const stock = req.body as Stock;
    stockRepository.update(id, stock, (notFound) => {
        if (notFound) {
            res.status(404).send({ error: 'Stock not found' });
        } else {
            res.send({ success: true });
        }
    });
});

stockRouter.delete('/stocks/:id', (req, res) => {
    const id = parseInt(req.params.id);
    stockRepository.delete(id, (notFound) => {
        if (notFound) {
            res.status(404).send({ error: 'Stock not found' });
        } else {
            res.send({ success: true });
        }
    });
});


export default stockRouter;