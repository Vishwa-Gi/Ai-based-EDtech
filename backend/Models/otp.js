import mongoose from "mongoose";

const otpSchema = new mongoose.Schema(
  {
    email: { type: String, required: true, trim: true },
    otp: { type: String, required: true },

    // Date field for expiry
    expiresAt: { 
      type: Date, 
      default: () => new Date(Date.now() + 5 * 60 * 1000) // expires in 5 minutes
    },

    verified: { type: Boolean, default: false }
  },
  { timestamps: true }
);

// TTL index: MongoDB automatically deletes expired OTPs
otpSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

const Otps = mongoose.model('Otps', otpSchema);
export default Otps; 
