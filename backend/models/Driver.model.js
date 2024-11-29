import mongoose from "mongoose";

const driverSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true
    },
    phoneNumber: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role:{
        type:String,
        default:'driver'
    },
    profilePicture: {
      type: String, 
    },
    make: {
      type: String,
    },
    model: {
      type: String,
    },
    year: {
      type: Number,
    },
    licensePlateNumber: {
      type: String,
      unique: true,
    },
    licenseNumber: {
      type: String,
      unique: true,
    },
    color: {
      type: String,
    },
    gender: {
        type: String,
        enum: ["Male", "Female", "Other"],
        required: true,
      },
    seatsAvailable: {
      type: Number,
      default: 4,
    },
    vehicleImage: {
      type: String, 
    },
    startLocation: {
        type: String
      },
      destination: {
        type: String
      },
  },
  { timestamps: true }
);

const Driver = mongoose.model("Driver", driverSchema);
export default Driver;
