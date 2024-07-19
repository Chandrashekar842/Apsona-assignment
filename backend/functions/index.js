import express from "express";
import cors from "cors";
import cron from "node-cron";
import ServerlessHttp from "serverless-http"
import { dbConnect } from "../src/Config/dbConnect.js";
import { errorHandler, notFound } from "../src/Middlewares/errMiddleware.js";
import { authRouter } from "../src/Routes/authRoutes.js";
import { noteRouter } from "../src/Routes/noteRoutes.js";
import { Note } from "../src/Models/note.js";

const app = express();

app.use(express.json());

const corsOptions = {
  origin: 'http://127.0.0.1:5500', // Update this to your frontend origin
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

app.use("/.netlify/functions/auth", authRouter);

app.use("/.netlify/functions/note", noteRouter);

app.use(notFound);

app.use(errorHandler);

cron.schedule("0 0 * * *", async () => {
  try {
    const thirtyDaysAgo = new Date(Date.now() - 30 * 24 * 60 * 60 * 1000);
    const result = await Note.deleteMany({
      trashedAt: { $lte: thirtyDaysAgo },
    });
    console.log(`Deleted ${result.deletedCount} old trashed notes`);
  } catch (error) {
    console.error("Error deleting old trashed notes:", error);
  }
});

dbConnect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("Connected to the server at port: ", process.env.PORT);
  });
});

const handler = ServerlessHttp(app)

export const handlerFunction = async (event, context) => {
  const result = await handler(event, context);
  return result;
};
