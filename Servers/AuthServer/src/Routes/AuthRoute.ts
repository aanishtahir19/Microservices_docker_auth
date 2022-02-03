import express from 'express';
import LoginController from '../Controllers/LoginController';
const router = express.Router();
import RegisterController from '../Controllers/RegisterController';
import GetNewAccessToken from '../Controllers/GetNewAccessToken';
router.route('/register').post(RegisterController)
router.route('/login').post(LoginController)
router.route('/refreshToken').post(GetNewAccessToken)
export default router;
