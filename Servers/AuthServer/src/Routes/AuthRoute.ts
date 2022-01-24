import express from 'express';
import LoginController from '../Controllers/LoginController';
const router = express.Router();
import RegisterController from '../Controllers/RegisterController';
router.route('/register').get(RegisterController)
router.route('/login').get(LoginController)
export default router;
