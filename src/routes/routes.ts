import { Express } from 'express';
import express from 'express'
import task from './task.ts'
import user from './auth.ts'

export default function (app: Express) {
    app
    .use(express.json())
    .use('/api/auth', user)
    .use('/api/task', task)
}