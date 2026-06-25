import express from "express";
import cors from "cors";

const app = express();
const PORT = 3001;

app.use(cors({ origin: "http://localhost:3000" }));
app.use(express.json());

app.get("/", (req, res) => {
  res.json({
    message: "panic mode: your computer is gonna blowup in 10 seconds",
  });
});

app.listen(PORT, () => {
  console.log(`fala que eu te escuto na porta ${PORT}`);
});
