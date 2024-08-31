import express, { Request, Response } from "express";
import bodyParser from "body-parser";
import { router } from "./routes/routes";
import errorHandler from "./util/errorhandler";
import dotenv from "dotenv";

dotenv.config();
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

app.use("/api/v1", router);

app.use(errorHandler);
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
