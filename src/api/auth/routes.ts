import express from 'express';
import validateRequest from '../../middleware/validateRequest';
import { authValidation } from './validate';
import { AuthController } from './controller';
const router = express.Router();

router.post(
    '/register',
    validateRequest(authValidation.registerZodSchema),
    AuthController.createUser
);

router.post(
    '/login',
    validateRequest(authValidation.LoginZodSchema),
    AuthController.loginUser
);

export const AuthRoute = router;
