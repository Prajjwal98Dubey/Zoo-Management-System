import express from "express";
import {
  addStaff,
  editStaff,
  getAllStaff,
} from "../controllers/staff.controllers.js";

const staffRouter = express.Router();

staffRouter.route("/add").post(addStaff);
staffRouter.route("/all").get(getAllStaff);
staffRouter.route("/edit/:staffId").put(editStaff);

export default staffRouter;
