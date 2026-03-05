import { Router } from "express";

const router = Router();

router.post('/login', authController.login);

export default router;
