import express, { json, urlencoded } from "express";
import { authMiddleware } from "./middleware/auth";
import {
  authRouter,
  courseRouter,
  instructorRouter,
  studentRouter,
} from "./routes";
import cors from "cors";
const app = express();

app.use(urlencoded({ extended: true }));
app.use(json());
app.use(cors());

app.use("/api/course", courseRouter);
app.use("/api/instructor", authMiddleware, instructorRouter);
app.use("/api/student", studentRouter);
app.use("/api/auth", authRouter);

app.get("/", (_req, res) => {
  res.send(`${process.env.ENV} server is REALLY up`);
});

app.listen(process.env.PORT || 3000, () => {
  console.log("server up");
});
