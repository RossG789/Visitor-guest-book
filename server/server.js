import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
const db = new Database("database.db");

const app = express();
app.use(express.json());
app.use(cors());

const PORT = "1111";

app.get("/", (req, res) => {
  res.send("H-...Hiiii	ԅ(≖‿≖ԅ)");
});

app.listen(PORT, () => console.log(`H-...Hiiii	ԅ(≖‿≖ԅ) @ localhost:${PORT}`));
