import express from "express";
import cors from "cors";

try {
  const app = express();

  app.use(express.json());
  app.use(
    cors({
      credentials: true,
      origin: ["http://localhost:3000"],
    })
  );

  app.listen(8000, () => {
    console.log("API Active and listening to Port 8000");
  });
} catch (error) {
  console.error(error);
}
