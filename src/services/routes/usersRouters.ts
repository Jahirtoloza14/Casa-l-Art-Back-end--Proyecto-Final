import express from "express";
import { UserControler } from "../../controllers/userController";
import { authorizeMiddleware, authorizeMiddlewareAdmin } from "../../middlewares/Admin";
import { auth } from "../../middlewares/auth";



const router = express.Router();


// endpoint register admin
router.post("/registerAdmin",UserControler.registerAdmin);



// endpoint register client
router.post("/register",UserControler.register);

// endpoint login
router.post("/login", UserControler.login);

// endpoint bring all users
router.get("/getall",auth, authorizeMiddlewareAdmin(["Admin"]), UserControler.getAll);

// endpoint bring profile
router.get("/profile",auth,authorizeMiddleware(["Client","Admin"]), UserControler.getLogedUser);

// endpoint update profile
router.put('/profile/update',auth,authorizeMiddleware(["Client","Admin"]) , UserControler.updateLogedUser);

// delete user
router.delete("/deleteUser/:id", auth, authorizeMiddleware(["Admin"]), UserControler.deleteUser);


export default router;