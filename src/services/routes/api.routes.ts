import express from "express";
import userRoutes from "./usersRouters";
import reservationsRoutes from "./Reservation";


const router = express.Router();

// API routes

router.use('/users', userRoutes);
router.use('/reservations', reservationsRoutes);

export default router;