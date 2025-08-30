import dotenv from "dotenv";
dotenv.config();
import app from "./config/app.config.js";

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
  console.log(`✅ Server running on http://localhost:${PORT}`);
});
