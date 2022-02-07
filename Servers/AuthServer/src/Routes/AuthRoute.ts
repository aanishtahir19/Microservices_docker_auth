import express from 'express';
import LoginController from '../Controllers/LoginController';
const router = express.Router();
import SignupController from '../Controllers/RegisterController';
import GetNewAccessToken from '../Controllers/GetNewAccessToken';
router.route('/signup').post(SignupController);
router.route('login').post(LoginController);
router.route('/refreshToken').post(GetNewAccessToken);
export default router;
