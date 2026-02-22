import express from "express";
import dotenv from "dotenv";

import mongoose from "mongoose";
import booksRoute from "./router/booksRoute.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();
const app = express();
const DBURI = process.env.DBURL;
const PORT = process.env.PORT;

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

// Health check (avoid shadowing SPA root in production)
app.get("/health", (_req, res) => {
  return res.status(200).send("Books Store API running");
});

app.use("/books", booksRoute);

// Removed serving frontend in production for separate deployment
app.get("/", (req, res) => {
  res.status(200).send("Welcome to Books Store API");
});


// Validate required configuration
if (!DBURI) {
  const msg = "Missing DBURL. Set DBURL in environment variables.";
  if (process.env.NODE_ENV === "production") {
    console.error(msg);
    process.exit(1);
  } else {
    console.warn(msg + " Using empty string will cause connection failure.");
  }
}

// Connect to MongoDB and start server
// MongoDB connection
if (!DBURI) {
  console.error('FATAL ERROR: DBURI environment variable is not set!');
  process.exit(1);
}

mongoose
  .connect(DBURI)
  .then(() => {
    console.log('Successfully connected to MongoDB');
    // Only verify we can connect, but let Vercel handle the listening if in production
    if (process.env.NODE_ENV !== 'production') {
      app.listen(PORT, () => {
        console.log(`App is listening on port ${PORT}`);
      });
    }
  })
  .catch((error) => {
    console.error('Failed to connect to MongoDB:', error);
    process.exit(1);
  });

export default app;
