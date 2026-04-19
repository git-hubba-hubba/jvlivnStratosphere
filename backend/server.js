import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const TECH_EVENT_RADIUS = "15mi";
const TECH_EVENT_LIMIT = "5";
const TECH_EVENT_CATEGORIES = "conferences,expos,academic";
const TECH_EVENT_LABELS = "science-and-technology,technology";
const PROGRAMMING_KEYWORDS = [
  "programming",
  "coding",
  "coder",
  "software",
  "developer",
  "developers",
  "development",
  "web development",
  "frontend",
  "backend",
  "full stack",
  "full-stack",
  "javascript",
  "typescript",
  "python",
  "java",
  "c#",
  "c++",
  "react",
  "node",
  "node.js",
  "devops",
  "cloud",
  "api",
  "hackathon",
  "engineering"
];
const PROGRAMMING_LABELS = [
  "science-and-technology",
  "technology"
];

function isProgrammingEvent(event) {
  const searchableText = [
    event.title,
    event.description,
    event.category
  ]
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const eventLabels = (event.phq_labels || [])
    .map((label) => label.label?.toLowerCase())
    .filter(Boolean);

  const matchesKeyword = PROGRAMMING_KEYWORDS.some((keyword) =>
    searchableText.includes(keyword)
  );
  const matchesLabel = eventLabels.some((label) =>
    PROGRAMMING_LABELS.includes(label)
  );

  return matchesKeyword && matchesLabel;
}

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

  app.get("/api/predicthq/events", async (req, res) => {
    try {
      const { zipcode } = req.query;

      if (!process.env.PREDICTHQ_ACCESS_TOKEN) {
        return res.status(500).json({
          error: "Missing PredictHQ access token"
        });
      }

      if (!zipcode) {
        return res.status(400).json({
          error: "Query parameter 'zipcode' is required"
        });
      }

      const normalizedZipcode = String(zipcode).trim();

      if (!/^\d{5}$/.test(normalizedZipcode)) {
        return res.status(400).json({
          error: "Zipcode must be a 5-digit US zip code"
        });
      }

      const zipLookupResponse = await fetch(
        `https://api.zippopotam.us/us/${normalizedZipcode}`,
        {
          method: "GET",
          headers: {
            Accept: "application/json"
          }
        }
      );

      if (!zipLookupResponse.ok) {
        return res.status(404).json({
          error: "Could not find that zipcode"
        });
      }

      const zipLookupData = await zipLookupResponse.json();
      const primaryPlace = zipLookupData.places?.[0];
      const latitude = primaryPlace?.latitude;
      const longitude = primaryPlace?.longitude;

      if (!latitude || !longitude) {
        return res.status(500).json({
          error: "Zipcode lookup did not return coordinates"
        });
      }

      const url = new URL("https://api.predicthq.com/v1/events/");
      url.searchParams.set("within", `${TECH_EVENT_RADIUS}@${latitude},${longitude}`);
      url.searchParams.set("limit", TECH_EVENT_LIMIT);
      url.searchParams.set("category", TECH_EVENT_CATEGORIES);
      url.searchParams.set("phq_label", TECH_EVENT_LABELS);
      url.searchParams.set("phq_label.op", "any");
      url.searchParams.set("country", "US");
      url.searchParams.set("start.gte", new Date().toISOString().slice(0, 10));
      url.searchParams.set("sort", "start");

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${process.env.PREDICTHQ_ACCESS_TOKEN}`,
          Accept: "application/json"
        }
      });

      const data = await response.json();
      const filteredResults = (data.results || [])
        .filter(isProgrammingEvent)
        .slice(0, Number(TECH_EVENT_LIMIT));

      res.status(response.status).json({
        ...data,
        count: filteredResults.length,
        results: filteredResults,
        searchedZipcode: normalizedZipcode,
        searchArea: {
          radius: TECH_EVENT_RADIUS,
          latitude,
          longitude
        }
      });
    } catch (error) {
      console.error("PredictHQ error:", error);
      res.status(500).json({
        error: "PredictHQ request failed",
        details: error.message
      });
    }
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
