import express from "express";
import {
  addAnimal,
  editAnimal,
  getAnimals,
} from "../controllers/animal.controllers.js";

const animalRouter = express.Router();

animalRouter.route("/add").post(addAnimal);
animalRouter.route("/all").get(getAnimals);
animalRouter.route("/edit/:animalId").put(editAnimal);
export default animalRouter;
