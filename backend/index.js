import express from "express";
import { mongoDBURL } from "./server.js";
import mongoose from "mongoose";
import booksRoute from "./router/booksRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const DB = process.env.DBURL || mongoDBURL;
const PORT = process.env.PORT || 3000;

// __dirname in ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

//it allows us use json in our express backend. // app.use allows us use middlewares more often.
// middleware for parsing in request body
app.use(express.json());

// CORS -> Cross-Origin Resource Sharing
app.use(
  cors({
    origin: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type"],
  }),
);

// Health check
app.get("/", (_req, res) => {
  return res.status(200).send("Books Store API running");
});

app.use("/books", booksRoute);

// Serve frontend in production
if (process.env.NODE_ENV === "production") {
  const frontendDistPath = path.resolve(__dirname, "../Frontend/dist");
  app.use(express.static(frontendDistPath));
  // SPA fallback
  app.get("*", (req, res) => {
    res.sendFile(path.join(frontendDistPath, "index.html"));
  });
}

//Connect my MongoDB database to my VS code
mongoose
  .connect(DB)
  .then(() => {
    console.log("app connected to database");
    app.listen(PORT, () => {
      console.log(`Server listening on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
