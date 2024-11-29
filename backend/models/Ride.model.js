import mongoose from "mongoose";

const rideSchema = new mongoose.Schema({
    driver: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Driver',
      required: true
    },
    passengers: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Rider',
      required:true
    }],
    startCoordinates: {
        type: { lat: Number, lng: Number }, 
        required: true,
      },
      endCoordinates: {
        type: { lat: Number, lng: Number }, 
        required: true,
      },
    startLocation: {
      type: String,
      required: true
    },
    endLocation: {
      type: String,
      required: true
    },
    startTime: {
      type: Date,
      default:Date.now,
      required: true
    },
    endTime:{
        type: Date,
        default:Date.now,
        required: true
    },
    seatsAvailable: {
        type: Number,
        required: true,
      },
    status: {
      type: String,
      enum: ['Scheduled', 'Ongoing', 'Completed', 'Cancelled'],
      default: 'Scheduled'
    },
    cost: {
      type: Number
    }
  }, { timestamps: true });
  
const Ride = mongoose.model('Ride', rideSchema);
export default Ride