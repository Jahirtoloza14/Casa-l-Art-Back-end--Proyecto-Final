import express from "express";
import { auth } from "../../middlewares/auth";
import { authorizeMiddleware, authorizeMiddlewareAdmin, } from "../../middlewares/Admin";
import {ReservationController, deleteReservation, getAllReservations, getByLogedClient, updateReservation } from "../../controllers/reservation";



const router = express.Router();

// bring all reservations
router.get("/get",auth, authorizeMiddlewareAdmin(["Admin"]), getAllReservations);

// create reservation
router.post("/newReservation", ReservationController.createReservation);

// found reservation by client
router.get("/myreservation/reservation", auth, authorizeMiddleware(["Client"]),getByLogedClient);


// delete reservation
router.delete("/delete/:id", auth, authorizeMiddleware(["Admin"]), deleteReservation);

// update reservation
router.put("/:id",auth, authorizeMiddlewareAdmin(["Admin"]), updateReservation);
export default router;