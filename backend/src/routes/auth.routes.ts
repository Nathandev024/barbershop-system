import { FastifyInstance } from "fastify";
import {
  registerUserController,
  loginUserController,
} from "../controllers/auth.controller.js";

export async function authRoutes(fastify: FastifyInstance) {
  fastify.post("/register", registerUserController);
  fastify.post("/login", loginUserController);
}
