import express, { Request, Response, Router } from 'express';

const router: Router = express.Router();

interface Pessoa {
    id: number;
    nome: string;
    sobrenome: string;
    email: string;
}

const people: Pessoa[] = [];
var ids = 1;

router.post('/usuarios', (req: Request, res: Response) => {
    const pessoa = req.body
    pessoa.id = ids++
    people.push(pessoa)
    res.status(200).send(`Pessoa ${pessoa.nome} ${pessoa.sobrenome} | email: ${pessoa.email} recebida com sucesso!`);
})
.get('/usuarios', (req: Request, res: Response) => {
    res.status(200).json(people)
})
.get('/usuarios/:id', (req: Request, res: Response) => {
    const { id } = req.params
    res.status(200).json(people.find(pessoa => pessoa.id === parseInt(id)))
})
.put('/usuarios/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome, sobrenome, email } = req.body;
    const pessoa = people.find(pessoa => pessoa.id === parseInt(id)); 
    if(pessoa){
        pessoa.email = email
        pessoa.nome = nome
        pessoa.sobrenome = sobrenome
        res.status(200).send(`Pessoa com o id: ${id} foi atualizado para ${nome} ${sobrenome} - ${email}`)
    }
})
.patch('/atualizar/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    const { nome } = req.body;
    const pessoa = people.find(pessoa => pessoa.id === parseInt(id)); 
    if(pessoa){
        pessoa.nome = nome
        res.send(`Nome da pessoa com ID ${id} foi atualizado para: ${nome}`);
    }
})
.delete('/deletar/:id', (req: Request, res: Response) => {
    const { id } = req.params;
    people.splice(people.findIndex(pessoa => pessoa.id === parseInt(id)), 1)
    res.status(200).send(`Pessoa com o id: ${id} foi deletada `)
})



export default router;