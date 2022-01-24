import express from 'express';
import LoginController from '../Controllers/LoginController';
const router = express.Router();
import RegisterController from '../Controllers/RegisterController';
router.route('/register').post(RegisterController)
router.route('/login').post(LoginController)
export default router;
