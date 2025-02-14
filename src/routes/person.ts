import express, { Request, Response, Router } from 'express';
import Person from '../models/Person.ts';
const router: Router = express.Router();

// REQUISIÇÃO COM MODELS

router.post('/register', async (req: Request, res: Response) => {
    const { name, age } = req.body;
    try {
        const person = new Person({ name, age });
        await person.save();
        res.status(201).json(person);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao criar pessoa', error });
    }
})
.get('/people', async (req: Request, res: Response) => {
    try {
    const people = await Person.find();
    res.status(200).json(people);
    } catch (error) {
    res.status(400).json({ message: 'Erro ao buscar pessoas', error });
    }
})
.put('/person/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    const { name, age } = req.body;

    try {
        const person = await Person.findByIdAndUpdate(id, { name, age }, { new: true });
        if (!person) {
            res.status(404).json({ message: 'Pessoa não encontrada' });
        }
        res.status(200).json(person);
    } catch (error) {
        res.status(400).json({ message: 'Erro ao atualizar pessoa', error });
    }
})
.delete('/person/:id', async (req: Request, res: Response) => {
    const { id } = req.params;
    
    try {
        const person = await Person.findByIdAndDelete(id);
        if (!person) {
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
// const people: Pessoa[] = [];
// var ids = 1;

// .post('/usuarios', (req: Request, res: Response) => {
//     const pessoa = req.body
//     pessoa.id = ids++
//     people.push(pessoa)
//     res.status(200).send(`Pessoa ${pessoa.nome} ${pessoa.sobrenome} | email: ${pessoa.email} recebida com sucesso!`);
// })
// .get('/usuarios', (req: Request, res: Response) => {
//     res.status(200).json(people)
// })
// .get('/usuarios/:id', (req: Request, res: Response) => {
//     const { id } = req.params
//     res.status(200).json(people.find(pessoa => pessoa.id === parseInt(id)))
// })
// .put('/usuarios/:id', (req: Request, res: Response) => {
//     const { id } = req.params;
//     const { nome, sobrenome, email } = req.body;
//     const pessoa = people.find(pessoa => pessoa.id === parseInt(id));
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
//     const pessoa = people.find(pessoa => pessoa.id === parseInt(id));
//     if (pessoa) {
//         pessoa.nome = nome
//         res.send(`Nome da pessoa com ID ${id} foi atualizado para: ${nome}`);
//     }
// })
// .delete('/deletar/:id', (req: Request, res: Response) => {
//     const { id } = req.params;
//     people.splice(people.findIndex(pessoa => pessoa.id === parseInt(id)), 1)
//     res.status(200).send(`Pessoa com o id: ${id} foi deletada `)
// })



export default router;