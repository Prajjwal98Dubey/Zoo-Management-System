import express from "express";
import cors from "cors";
import animalRouter from "./routes/animal.routes.js";
import staffRouter from "./routes/staff.route.js";
import visitorRouter from "./routes/visitor.route.js";
import feedingRouter from "./routes/feeding.route.js";
import dashboardRouter from "./routes/dashboard.route.js";
import activityRouter from "./routes/activity.route.js";

const app = express();

app.use(
  cors({
    origin: "*",
  })
);

app.use(express.json());

/* ANIMALS */
app.use("/api/v1/animal", animalRouter);

/* STAFF */
app.use("/api/v1/staff", staffRouter);

/* VISITORS */
app.use("/api/v1/visitor", visitorRouter);

/* FEEDINGS */
app.use("/api/v1/feeding-schedules", feedingRouter);

/* DASHBOARD */
app.use("/api/v1/stats", dashboardRouter);

/* RECENT ACTIVITY */
app.use("/api/v1/recent-activity", activityRouter);

app.listen(5000, () => console.log("server listening at 5000"));
