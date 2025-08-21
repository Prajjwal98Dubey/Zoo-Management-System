import express from "express";
import cors from "cors";
import animalRouter from "./routes/animal.routes.js";
import staffRouter from "./routes/staff.route.js";
import visitorRouter from "./routes/visitor.route.js";

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

app.listen(5000, () => console.log("server listening at 5000"));
