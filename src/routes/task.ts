import express, { Request, Response, Router } from 'express';
import Task from '../models/Task.ts';
const router: Router = express.Router();

// REQUISIÇÃO COM MODELS

router.post('/register', async (req: Request, res: Response) => {
    const { name, age } = req.body;
    try {
        const task = new Task({ name, age });
        await task.save();
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar pessoa', error });
    }
})
.get('/task', async (req: Request, res: Response) => {
    try {
        const task = await Task.find();
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao buscar pessoas', error });
    }
})
.put('/task/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, age } = req.body;

    try {
        const task = await Task.findByIdAndUpdate(id, { name, age }, { new: true });
        if (!task) {
            res.status(404).json({ message: 'Pessoa não encontrada' });
        }
        res.status(200).json(task);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar pessoa', error });
    }
})
.delete('/task/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const task = await Task.findByIdAndDelete(id);
        if (!task) {
            res.status(404).json({ message: 'Pessoa não encontrada' });
        }
        res.status(200).json({ message: 'Pessoa deletada com sucesso' });
    } catch (error) {
        res.status(400).json({ message: 'Erro ao deletar pessoa', error });
    }
});

// REQUISIÇÃO COM LISTA SIMPLES

// interface Pessoa {
//     id: number;
//     nome: string;
//     sobrenome: string;
//     email: string;
// }
// const task: Pessoa[] = [];
// var ids = 1;

// .post('/usuarios', (req: Request, res: Response) => {
//     const pessoa = req.body
//     pessoa.id = ids++
//     task.push(pessoa)
//     res.status(200).send(`Pessoa ${pessoa.nome} ${pessoa.sobrenome} | email: ${pessoa.email} recebida com sucesso!`);
// })
// .get('/usuarios', (req: Request, res: Response) => {
//     res.status(200).json(task)
// })
// .get('/usuarios/:id', (req: Request, res: Response) => {
//     const { id } = req.params
//     res.status(200).json(task.find(pessoa => pessoa.id === parseInt(id)))
// })
// .put('/usuarios/:id', (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { nome, sobrenome, email } = req.body;
//     const pessoa = task.find(pessoa => pessoa.id === parseInt(id));
//     if (pessoa) {
//         pessoa.email = email
//         pessoa.nome = nome
//         pessoa.sobrenome = sobrenome
//         res.status(200).send(`Pessoa com o id: ${id} foi atualizado para ${nome} ${sobrenome} - ${email}`)
//     }
// })
// .patch('/atualizar/:id', (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { nome } = req.body;
//     const pessoa = task.find(pessoa => pessoa.id === parseInt(id));
//     if (pessoa) {
//         pessoa.nome = nome
//         res.send(`Nome da pessoa com ID ${id} foi atualizado para: ${nome}`);
//     }
// })
// .delete('/deletar/:id', (req: Request, res: Response) => {
//     const { id } = req.params;
//     task.splice(task.findIndex(pessoa => pessoa.id === parseInt(id)), 1)
//     res.status(200).send(`Pessoa com o id: ${id} foi deletada `)
// })

export default router;