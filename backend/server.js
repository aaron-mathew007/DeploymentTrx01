import express from "express";
import { getDeployments, saveDeployment } from "./oracleDB.js";

const app = express();
app.use(express.json());

// API endpoint to fetch deployments
app.get("/deployments", async (req, res) => {
  const data = await getDeployments();
  res.json(data);
});

// API endpoint to save a deployment
app.post("/deployments", async (req, res) => {
  await saveDeployment(req.body);
  res.status(201).json({ message: "Deployment saved!" });
});

const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
