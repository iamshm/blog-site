import { Hono } from "hono";
import { AppType } from "./type";
import userRouter from "./routes/user";
import blogRouter from "./routes/blog";
import { cors } from "hono/cors";

const app = new Hono<AppType>();

app.use(
  cors({
    origin: "*",
  }),
);

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
