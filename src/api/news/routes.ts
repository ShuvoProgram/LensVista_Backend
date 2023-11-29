import express from "express";
import { User_Role } from "../../enums/user";
import { newsController } from "./controller";
import auth from "../../middleware/auth";

const router = express.Router();

router.post(
    '/',
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    newsController.createNews
);

router.get('/', newsController.getAllNews);

router.get('/:id', newsController.getSingleNews);

router.patch(
    '/:id',
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    newsController.updateNews
);

router.delete(
    '/:id',
    auth(User_Role.ADMIN, User_Role.SUPER_ADMIN),
    newsController.deleteNews
);