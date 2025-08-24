import express from "express";
import {
  addFeedingSchedule,
  getCompletedFeedings,
  getPendingFeedingsForToday,
  markFeedingCompleted,
  updateFeedingSchedule,
} from "../controllers/feeding.controllers.js";

const feedingRouter = express.Router();

feedingRouter.route("/create").post(addFeedingSchedule);
feedingRouter.route("/edit/:id").put(updateFeedingSchedule);
feedingRouter.route("/update/:id/complete").patch(markFeedingCompleted);
feedingRouter.route("/pending").get(getPendingFeedingsForToday);
feedingRouter.route("/complete").get(getCompletedFeedings);

export default feedingRouter;
