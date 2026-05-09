import express from "express";
import {
  deleteUserDashboard,
  getAllUserDashboards,
  getMyUserDashboard,
  getUserDashboardBootstrap,
  getUserDashboardById,
  saveMyUserDashboard,
} from "../controllers/userdashboardController.js";
import verifyToken, { verifyAdmin } from "../middleware/auth.js";
import validateId from "../middleware/validateId.js";

const router = express.Router();

router.get("/bootstrap", verifyToken, getUserDashboardBootstrap);
router.get("/me", verifyToken, getMyUserDashboard);
router.put("/me", verifyToken, saveMyUserDashboard);
router.get("/", verifyToken, verifyAdmin, getAllUserDashboards);
router.get("/:id", verifyToken, verifyAdmin, validateId, getUserDashboardById);
router.delete("/:id", verifyToken, verifyAdmin, validateId, deleteUserDashboard);

export default router;
