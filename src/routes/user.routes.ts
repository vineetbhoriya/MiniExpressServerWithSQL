import express from "express";
import {
  createUser,
  getUser,
  updateUser,
  deleteUser,
} from "../controllers/userController";

const router = express.Router();

router.post("/", createUser);

router.get("/", getUser);

router.patch("/:id", updateUser);

router.delete("/:id", deleteUser);

export { router as UserRoutes };
