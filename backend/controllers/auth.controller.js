import Driver from "../models/Driver.model.js";
import Rider from "../models/Rider.model.js";
import bcrypt from "bcrypt";
import generatejwt from "../utility/generate-jwt.js";
import verifyRoute from "../middlewares/verifyRoute.js";
export const signup = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      password,
      confirmedPassword,
      gender,
      role,
    } = req.body;
    console.log(req.body);
    if (
      !name ||
      !email ||
      !password ||
      !confirmedPassword ||
      !role ||
      !gender
    ) {
      return res.status(400).send({ message: "All fields are required" });
    }

    if (password != confirmedPassword) {
      return res
        .status(401)
        .send({ message: "Password and Confirmed password doesn't match" });
    }
    const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
    if (!emailRegex.test(email)) {
      return res
        .status(400)
        .send({
          message:
            "Invalid email format. Must be in the format 'name@gmail.com'",
        });
    }

    const existingRider = await Rider.findOne({ email });
    const existingDriver = await Driver.findOne({ email });

    if (existingRider || existingDriver) {
      return res.status(401).send({ message: "User Already Exists" });
    }
    const boypic = `https://avatar.iran.liara.run/public/boy?username=${name}`;
    const girlpic = `https://avatar.iran.liara.run/public/girl?username=${name}`;
    const passwordHash = await bcrypt.hash(password, 10);

    let newuser;
    if (role === "driver") {
      const {
        make,
        model,
        year,
        licensePlateNumber,
        licenseNumber,
        color,
        seatsAvailable,
        vehicleImage,
      } = req.body;
      newuser = await new Driver({
        name,
        email,
        phoneNumber,
        password: passwordHash,
        gender,
        role,
        make,
        model,
        year,
        licensePlateNumber,
        licenseNumber,
        color,
        seatsAvailable,
        vehicleImage,
        profilepic: gender == "Male" ? boypic : girlpic,
      }).save();
    } else if (role === "rider") {
      newuser = await new Rider({
        name,
        email,
        phoneNumber,
        password: passwordHash,
        role,
        gender,
        profilepic: gender == "Male" ? boypic : girlpic,
      }).save();
    }

    generatejwt(newuser._id,newuser.role, res);
    res.status(200).json({
      _id: newuser._id,
      name: newuser.name,
      email: newuser.email,
      phoneNumber: newuser.phoneNumber,
      gender: newuser.gender,
      profilepic: newuser.profilepic,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Internal server error", error: err.message });
  }
};

export const login = async (req, res) => {
  try {
    const { email, password, role } = req.body;
    let user;
    if (role === "rider") {
      user = await Rider.findOne({ email });
    } else {
      user = await Driver.findOne({ email });
    }
    if (!user) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    const isvalidPassword = await bcrypt.compare(
      password,
      user ? user.password : " "
    );
    if (!isvalidPassword) {
      return res.status(400).send({ message: "Invalid email or password" });
    }
    generatejwt(user._id, user.role,res);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      gender: user.gender,
      profilepic: user.profilepic,
    });
  } catch (err) {
    res
      .status(500)
      .send({ message: "internal server error", error: err.message });
  }
};

export const logout = async (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).send({ message: "logout successfully" });
  } catch (err) {
    res
      .status(500)
      .send({ message: "Error:Interval Server Error", error: err.message });
  }
};

export const location = [
  verifyRoute,
  async (req, res) => {
    try {
      const { startLocation, destination } = req.body;

      if (!startLocation || !destination) {
        return res
          .status(400)
          .json({ message: "Start location and destination are required." });
      }

     
      const driver = await Driver.findById(req.userId); 
      if (driver) {
        const updatedDriver = await Driver.findByIdAndUpdate(
          req.userId, // Access userId from the request
          { startLocation, destination },
          { new: true }
        );

        if (!updatedDriver) {
          return res.status(404).json({ message: "Driver not found." });
        }

        return res.status(200).json({
          message: "Driver location updated successfully.",
          driver: updatedDriver,
        });
      }


      const rider = await Rider.findById(req.userId);
      if (rider) {
        const updatedRider = await Rider.findByIdAndUpdate(
          req.userId,
          { startLocation, destination }, 
          { new: true }
        );

        if (!updatedRider) {
          return res.status(404).json({ message: "Rider not found." });
        }

        return res.status(200).json({
          message: "Rider location update received successfully.",
          rider: updatedRider, 
        });
      }

      return res.status(400).json({ message: "Invalid user role." });

    } catch (err) {
      console.error("Error updating location:", err.message);
      return res.status(500).json({
        message: "Internal server error.",
        error: err.message,
      });
    }
  },
];
