import express from "express";
import {
  deleteOnboarding,
  getAllOnboardings,
  getMyOnboarding,
  getOnboardingById,
  getOnboardingConfig,
  saveMyOnboarding,
} from "../controllers/onboardingController.js";
import verifyToken, { verifyAdmin } from "../middleware/auth.js";
import validateId from "../middleware/validateId.js";

const router = express.Router();

router.get("/config", getOnboardingConfig);
router.get("/me", verifyToken, getMyOnboarding);
router.put("/me", verifyToken, saveMyOnboarding);
router.get("/", verifyToken, verifyAdmin, getAllOnboardings);
router.get("/:id", verifyToken, verifyAdmin, validateId, getOnboardingById);
router.delete("/:id", verifyToken, verifyAdmin, validateId, deleteOnboarding);

export default router;
