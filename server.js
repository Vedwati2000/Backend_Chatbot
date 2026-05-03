import dotenv from "dotenv";
import express from "express";
import cors from "cors";
dotenv.config();

const app = express();

app.use(cors({
  origin: [
    "https://vedwati2000.github.io/chatboot_frontend/",
    "https://tranquil-cocada-8513aa.netlify.app"
  ],
  methods: ["GET", "POST"],
  credentials: true
}));


app.use(express.json())
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY;

app.post("/chat", async (req, res) => {
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-3-flash-preview:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(req.body), 
      }
    );

    const data = await response.json();
    res.json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
});
app.get("/chat", (req, res) => {
    res.send("Chat API is working");
})






app.listen(PORT, () => console.log(`Server running on port http://localhost:${PORT}`));