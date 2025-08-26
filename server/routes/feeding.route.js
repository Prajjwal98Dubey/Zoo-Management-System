import express from "express";
import {
  addFeedingSchedule,
  getCompletedFeedings,
  getPendingFeedingsForToday,
  markFeedingCompleted,
  updateFeedingSchedule,
} from "../controllers/feeding.controllers.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";
import { managerAccessMiddleware } from "../middlewares/admin.middlware.js";

const feedingRouter = express.Router();

feedingRouter
  .route("/create")
  .post(authMiddleware, managerAccessMiddleware, addFeedingSchedule);
feedingRouter.route("/edit/:id").put(updateFeedingSchedule);
feedingRouter.route("/update/:id/complete").patch(markFeedingCompleted);
feedingRouter.route("/pending").get(getPendingFeedingsForToday);
feedingRouter.route("/complete").get(getCompletedFeedings);

export default feedingRouter;
