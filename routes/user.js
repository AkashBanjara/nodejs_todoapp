import express from "express";
import {
  // deleteUser,
  getMyProfile,
  login,
  logout,
  register,
  // updateUser,
} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = express.Router();


router.post("/new", register);
router.post("/login", login);
router.get("/logout", logout);
router.get("/me", isAuthenticated, getMyProfile)




//! route spitting for same router but different methodos
router
  // .route("/userid/:id")
  // .get(getMyProfile)
  // .put(updateUser)
  // .delete(deleteUser);

// router.get("/userid/:id", getUserDetail);
// router.put("/userid/:id", updateUser);
// router.delete("/userid/:id", deleteUser);

export default router;
