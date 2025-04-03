import mongoose from "mongoose";
import profile from "../models/profileModel.js";
import uploadToCloudinary from "../middlewares/cloudinary.js";

export async function fetchProfiles(req, res) {
  try {
    const profiles = await profile.find({});

    if (!profiles) {
      return res.status(500).send({ message: "No Profile Found" });
    }
    return res.send({ profiles });
  } catch (error) {
    res.status(500).send({ message: "Couldn't fetch profiles" });
  }
}

export async function fetchProfile(req, res) {
  console.log("shikhar");
  try {
    const { id } = req.params;
    const singleProfile = await profile.findById(id);
    if (!singleProfile)
      return res.status(404).send({ message: "Profile not found" });
    return res.status(200).send({ profile: singleProfile });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Couldn't fetch profile", error: error.message });
  }
}

export async function createProfile(req, res) {
  // console.log('Shikhar')
  try {
    const file = req.file;
    if (!file) return res.status(404).send({ message: "File Not Found" });
    const secure_url = await uploadToCloudinary(req);

    const existingProfile = await profile.findOne({ phone: req.body.phone });
    if (existingProfile) {
      return res
        .status(400)
        .send({ message: "A profile with this number already exists." });
    }

    const newProfile = new profile({
      ...req.body,
      photo: secure_url,
    });
    await newProfile.save();
    res.status(201).send("Profile Created");
  } catch (error) {
    res
      .status(500)
      .send({ message: "Profile not added", Error: error.message });
  }
}

export async function deleteProfile(req, res) {
  try {
    const { id } = req.params;
    console.log(id);
    if (!id) return res.status(404).send({ message: "No Id found" });

    let profileToDelete = await profile.findByIdAndDelete(id);
    console.log(profileToDelete);
    if (!profileToDelete) {
      return res.status(400).send({ message: "Could not delete the profile." });
    }
    return res.status(200).send({ message: "Profile deleted successfully." });
  } catch (error) {
    return res
      .status(500)
      .send({ message: "Failed to delete profile", error: error.message });
  }
}

export async function updateProfile(req, res) {
  try {
    const file = req.file;
    const { id } = req.params;
    if (!file) return res.status(404).send({ message: "File Not Found" });
    if (!id) return res.status(404).send({ message: "No Id found" });
    const secure_url = await uploadToCloudinary(req);

    const updatedProfile = await profile.findByIdAndUpdate(
      id,
      { ...req.body, photo: secure_url },
      { new: true }
    );
    if (!updatedProfile) {
      return res.status(404).send({ message: "Profile not found" });
    }

    res
      .status(200)
      .send({ message: "Profile updated", profile: updatedProfile });
  } catch (error) {
    res
      .status(500)
      .send({ message: "Failed to update the profile", error: error.message });
  }
}
