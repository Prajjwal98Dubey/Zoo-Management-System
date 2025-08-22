import express from "express";
import {
  addActivity,
  getAllRecentActivities,
} from "../controllers/activity.controllers.js";

const activityRouter = express.Router();

activityRouter.route("/all").get(getAllRecentActivities);
activityRouter.route("/add").post(addActivity);

export default activityRouter;
