import Driver from "../models/Driver.model.js";

export const driver = async (req,res)=>{
    try {
        const driverDetails = await Driver.find({}, "name phoneNumber make licensePlateNumber color gender seatsAvailable startLocation destination"); 
    
        if (!driverDetails || driverDetails.length === 0) {
          return res.status(404).json({ message: "No driver details found." });
        }
    
        res.status(200).json(driverDetails);
      } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error while fetching driver details." });
      }
}