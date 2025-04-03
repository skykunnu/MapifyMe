import express from "express";
import upload from "../middlewares/multer.js";
import {
  createProfile,
  deleteProfile,
  fetchProfile,
  fetchProfiles,
  updateProfile,
} from "../controllers/Profiles.js";

const profileRouter = express.Router();

profileRouter.get("/fetch", fetchProfiles);
profileRouter.get("/fetch/:id", fetchProfile);
profileRouter.post("/addProfile", upload.single("photo"), createProfile);
profileRouter.delete("/deleteProfile/:id", deleteProfile);
profileRouter.put("/update/:id", upload.single("photo"), updateProfile);

export default profileRouter;
