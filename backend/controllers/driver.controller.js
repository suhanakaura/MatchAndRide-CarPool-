import Driver from "../models/Driver.model.js";
import Rider from "../models/Rider.model.js";
export const driver = async (req, res) => {
  try {
    const riderId = req.userId;
    console.log(riderId)
    const rider = await Rider.findById(riderId)
    console.log(rider)
    if(!rider){
      return res.status(404).json({message:"Rider not found"})
    }
    const {startLocation,destination} = rider;
    console.log("Rider Start Location:", startLocation);
    console.log("Rider Destination:", destination);
    const driverDetails = await Driver.find({seatsAvailable: { $gt: 0 },startLocation,destination},
      "name phoneNumber make licensePlateNumber color gender seatsAvailable startLocation destination"
    );
    console.log("Matching Driver Details:", driverDetails);

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
