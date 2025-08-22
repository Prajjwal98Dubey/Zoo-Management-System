import express from "express";
import { getDashboardStats } from "../controllers/dashboard.controller.js";

const dashboardRouter = express.Router();

dashboardRouter.route("/dashboard").get(getDashboardStats);

export default dashboardRouter;
