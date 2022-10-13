import express from "express";
import User from "../models/userSchema.js";

const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const newUser = new User({
      username: req.body.username,
      email: req.body.email,
      address: req.body.address,
      phone: req.body.phone,
    });

    const user = await User.findOne({ email: req.body.email });

    if (user) {
      res.status(400).json({ message: "User already registered" });
    }

    await newUser.save();

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

router.get("/allUsers", async (req, res) => {
  try {
    const users = await User.find();

    res.json({ users: users });
  } catch (error) {
    res.status(500).json({ message: error });
  }
});

export default router;
