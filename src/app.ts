import express, { Application } from 'express';
import cors from "cors";
import { corsOptions } from './config/cors';
import dotenv from "dotenv";
import apiRoutes from './services/routes/api.routes';


dotenv.config();
const app: Application = express();
//Middlewares
app.use(express.json());
app.use(cors(corsOptions));
// Register API routes
app.use("/api", apiRoutes)


export default app;