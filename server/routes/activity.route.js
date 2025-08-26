import express from "express";
import {
  addActivity,
  getAllRecentActivities,
} from "../controllers/activity.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { managerAccessMiddleware } from "../middlewares/admin.middlware.js";

const activityRouter = express.Router();

activityRouter.route("/all").get(getAllRecentActivities);
activityRouter
  .route("/add")
  .post(authMiddleware, managerAccessMiddleware, addActivity);

export default activityRouter;
