import jwt from "jsonwebtoken";
import Driver from "../models/Driver.model.js";
import Rider from "../models/Rider.model.js";

const verifyRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Authentication token not found." });
    }

    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_KEY);
    console.log("Decoded Token:", decodedToken);

    const { userid, role } = decodedToken; 
    req.userId = userid;
    req.userRole = role;

    const user = role === "driver" 
      ? await Driver.findById(userid) 
      : await Rider.findById(userid);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    next();
  } catch (err) {
    console.error("Error in verifyRoute:", err.message);
    if (err.name === "JsonWebTokenError") {
      return res.status(401).json({ message: "Malformed token." });
    } else if (err.name === "TokenExpiredError") {
      return res.status(401).json({ message: "Token expired." });
    }
    res.status(500).json({ message: "Internal server error.", error: err.message });
  }
};

export default verifyRoute;
