import express, { Request, Response, Router } from 'express';
// import Auth from '../models/Auth.ts';
const router: Router = express.Router();
import AuthController from '../controllers/AuthController.ts'

// REQUISIÇÃO COM MODELS

router.post("/register", AuthController.register);
router.post("/login", AuthController.login);
// router.post("/register", UserController.getUsers);
// router.delete("/user/:id", UserController.deleteUser);
// router.put("/user/:id", UserController.updateUser);


export default router;