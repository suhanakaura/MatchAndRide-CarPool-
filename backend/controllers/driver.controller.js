import Driver from "../models/Driver.model.js";
import Rider from "../models/Rider.model.js";
export const driver = async (req, res) => {
  try {
    const riderId = req.userId;
    const rider = await Rider.findById(riderId)
    if(!rider){
      return res.status(404).json({message:"Rider not found"})
    }
    const {startLocation,destination} = rider;
    const driverDetails = await Driver.find({availableSeats: { $gt: 0 },startLocation:startLocation,destination:destination},
      "name phoneNumber make licensePlateNumber color gender seatsAvailable startLocation destination"
    );

    if (!driverDetails || driverDetails.length === 0) {
      return res.status(404).json({ message: "No driver details found." });
    }

    res.status(200).json(driverDetails);
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .json({ error: "Server error while fetching driver details." });
  }
};
