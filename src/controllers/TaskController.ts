import { Request, Response } from "express";
import Task from '../models/Task.ts';

class TaskController {

    static async getTasks(req: Request, res: Response) {
        try {
            const task = await Task.find();
            res.status(200).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao buscar pessoas', error });
        }
    }

    static async createTask(req: Request, res: Response) {
        const { title, description, date, status } = req.body;
        try {
            const task = new Task({ title, description, date, status });
            await task.save();
            res.status(201).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao criar pessoa', error });
        }
    }

    static async updateTask(req: Request, res: Response) {
        const { id } = req.params;
        const { title, description, date, status } = req.body;

        try {
            const task = await Task.findByIdAndUpdate(id, { title, description, date, status }, { new: true });
            if (!task) {
                res.status(404).json({ message: 'Pessoa não encontrada' });
            }
            res.status(200).json(task);
        } catch (error) {
            res.status(400).json({ message: 'Erro ao atualizar pessoa', error });
        }
    }

    static async deleteTask(req: Request, res: Response) {
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
    }
}
   
export default TaskController;