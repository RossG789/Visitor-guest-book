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

app.get("/messages", (req, res) => {
  try {
    if (req.query.id) {
      let message = db
        .prepare(`SELECT * FROM messages WHERE id = ?`)
        .all(req.query.id);
      res.status(200).json(message);
      return;
    }

    let message = db.prepare(`SELECT * FROM messages`).all();
    res.status(200).json(message);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.post("/messages", (req, res) => {
  try {
    const name = req.body.name;
    const date = req.body.date;
    const userMessage = req.body.message;

    const newMessage = db
      .prepare(`INSERT INTO messages (name, date, message) VALUES (?, ?, ?)`)
      .run(name, date, userMessage);
    res.status(200).json(newMessage);
  } catch (err) {
    res.status(500).json(err);
  }
});

app.delete("/messages/:id", (req, res) => {
  try {
    const id = req.params.id;
    const deletedMessage = db
      .prepare(`DELETE FROM messages WHERE id = ?`)
      .run(id);
    res.status(204).json({ recordDeleted: deletedMessage });
  } catch (err) {
    res.status(500).json(err);
  }
});

app.put("/messages/:id", (req, res) => {
  try {
    const id = req.params.id;
    const name = req.body.name;
    const date = req.body.date;
    const userMessage = req.body.message;

    const updatedMessages = db
      .prepare(
        `UPDATE messages SET name = ?, date = ?, message = ? WHERE id = ? `
      )
      .run(name, date, userMessage, id);
    res.status(200).json({ messaged: updatedMessages });
  } catch (err) {}
});

app.listen(PORT, () => console.log(`H-...Hiiii	ԅ(≖‿≖ԅ) @ localhost:${PORT}`));
