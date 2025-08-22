import express from "express";
import {
  addAnimal,
  editAnimal,
  getAnimals,
  getCriticalHealthAnimals,
} from "../controllers/animal.controllers.js";

const animalRouter = express.Router();

animalRouter.route("/add").post(addAnimal);
animalRouter.route("/all").get(getAnimals);
animalRouter.route("/edit/:animalId").put(editAnimal);
animalRouter.route("/status").get(getCriticalHealthAnimals);

export default animalRouter;
