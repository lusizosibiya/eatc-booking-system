import express from "express";
import cors from "cors";
import clinicians from "./data/clinicians.js"

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:5173" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({message: "Welcome to the EATC Booking API!"});
});

app.get("/api/clinicians", (req, res) => {
  res.json(clinicians) 
})

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});