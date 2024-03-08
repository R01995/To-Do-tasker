const  mongoose = require("mongoose");


const otpSchema = new mongoose.Schema({
    email: {type: String },
    otp: {type: String },
    status: {type: Number, default: 0}, //status=1 means OTP is verified ,
    createDate: {type: Date, default: Date.now}
},
{versionKey: false}
)

const OtpModel = mongoose.model("Otps", otpSchema);
module.exports = OtpModel