import mongoose from "mongoose";

const riderSchema = new mongoose.Schema(
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
        default:'rider'
    },
    profilePicture: {
      type: String, 
    },
    gender: {
      type: String,
      enum: ["Male", "Female", "Other"],
      required: true,
    },
    startLocation: {
      type: String,
    },
    destination: {
      type: String,
    },
  },
  { timestamps: true }
);

const Rider = mongoose.model("Rider", riderSchema);
export default Rider;
