import express from 'express';
import User from '../models/user-model';
import userRepository from '../repositories/user-repository';

const userRouter = express.Router();

userRouter.post('/users', (req, res) => {
    const user = req.body as User;
    userRepository.addNew(user, (id) => {
        if (id) {
            res.status(201).send({ id });
        } else {
            res.status(500).send({ error: 'Internal error' });
        }
    });
});

userRouter.get('/users/:id', (req, res) => {
    console.log("dasd");
    const id = parseInt(req.params.id);
    console.log(id);
    userRepository.getById(id, (user) => {
        if (user) {
            res.send(user);
        } else {
            res.status(404).send({ error: 'User not found' });
        }
    });
});

export default userRouter;