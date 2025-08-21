import express from "express";
import {
  addTicket,
  getTodayAndYesterdayVisitors,
} from "../controllers/visitor.controllers.js";

const visitorRouter = express.Router();

visitorRouter.route("/ticket").post(addTicket);
visitorRouter.route("/daily-count").get(getTodayAndYesterdayVisitors);

export default visitorRouter;
