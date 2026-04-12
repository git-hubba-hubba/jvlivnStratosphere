import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST", "OPTIONS"],
    allowedHeaders: ["Content-Type"],
}));
app.use(express.json());

// ResumeBuilder
// app.post("/api/anthropic", async (req, res) => {
//   try {
//     const response = await fetch("https://api.anthropic.com/v1/messages", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//         "x-api-key": process.env.ANTHROPIC_API_KEY,
//         "anthropic-version": "2023-06-01",
//       },
//       body: JSON.stringify({
//         model: "claude-sonnet-4-20250514",
//         max_tokens: 300,
//         messages: [
//           {
//             role: "user",
//             content: req.body.message,
//           },
//         ],
//       }),
//     });

//     const data = await response.json();
//     res.status(response.status).json(data);
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Server request failed" });
//   }
// });
app.get("/", (req, res) => {
    res.json({ ok: true, message: "Backend is running" });
  });
  
  app.post("/api/anthropic", async (req, res) => {
    try {
      const { message } = req.body;
  
      const response = await fetch("https://api.anthropic.com/v1/messages", {
        method: "POST",
        headers: {
          "content-type": "application/json",
          "x-api-key": process.env.ANTHROPIC_API_KEY,
          "anthropic-version": "2023-06-01"
        },
        body: JSON.stringify({
          model: "claude-sonnet-4-20250514",
          max_tokens: 300,
          messages: [
            {
              role: "user",
              content: message
            }
          ]
        })
      });
  
      const data = await response.json();
  
      res.status(response.status).json(data);
    } catch (error) {
      console.error("Backend error:", error);
      res.status(500).json({
        error: "Request failed",
        details: error.message
      });
    }
  });
  
  const port = process.env.PORT || 3001;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
