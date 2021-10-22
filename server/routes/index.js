import express from "express";
const router = express.Router();
import {
  regiaterController,
  loginController,
  userController,
  refreshController,
  productController,
} from "../controller";
import auth from "../middlewares/auth";
import admin from '../middlewares/admin';


router.get("/", regiaterController.register);
router.post("/login", loginController.login);
router.get("/me", auth, userController.me);
router.post("/refresh", refreshController.refresh);
router.post("/logout", auth, loginController.logout);

router.post("/products", [auth, admin], productController.store);
router.put("/products/:id", [auth, admin], productController.update);
router.delete("/products/:id", [auth, admin], productController.destroy);

router.get("/products", productController.index);
router.get("/products/:id", productController.show);

export default router;
