const UserModel = require("../models/UserModel");
const jwt = require('jsonwebtoken');
const SendEmailUtility = require("../utility/SendEmailUtility");
const OtpModel = require("../models/OtpModel");




//Registration start
exports.Registration = async (req, res) => {
   try {

      const reqBody = req.body;
      const user = await UserModel.create(reqBody);
      res.status(200).json({ status:"success", data: user });  

   }
   catch(err) {
       res.status(400).json({ status:"fail", message: err.message });
   }

}
//Registration end

//Login start

exports.Login = async (req, res) => {
   try {
      const reqBody = req.body;
      const user = await UserModel.findOne(reqBody);
      if(!user) {
         return res.status(400).json({ status:"fail", message: "User not found" });         
      }
     
      if(user.password !== reqBody.password) {
         return res.status(400).json({ status:"fail", message: "Password not matched" });   
      }
      else {

         // token generate start
         const payload = {
            exp: Math.floor(Date.now() / 1000) + (60 * 60), // 1 hour
            data: user["email"]  //data: user.email   
         }
         let token = jwt.sign(payload, "12345678");

         // token generate end
         //projection
         const responseData = {email: user["email"], firstName: user["firstName"], lastName: user["lastName"], profilePic: user["profilePic"]};
        res.status(200).json({ status:"success", data: responseData, token: token });
      }
   }
   catch(err) {
       res.status(400).json({ status:"fail", message: err.message });
   }
}

//Login end

// User details start
exports.ProfileDetails = async (req, res) => {
   try {
      let email = req.headers.email;
      let query = { email: email };
      const user = await UserModel.findOne(query);
      //projection
      const responseData = {email: user["email"], firstName: user["firstName"], lastName: user["lastName"]};
      res.status(200).json({ status:"success", data: responseData });
   }
   catch(err) {
       res.status(200).json({ status:"fail", data:err});
   }
}
// User details end

//Update profile start
exports.UpdateProfile = async (req, res) => {
   try {
      let email = req.headers.email;
      let reqBody = req.body;
      let query = { email: email };
      const user = await UserModel.updateOne(query, reqBody);
      res.status(200).json({ status:"success", data: user });
   }
   catch(err) {
       res.status(400).json({ status:"fail", data: message });
   }
}
//Update profile end

//Email verify start
exports.EmailVerify = async (req, res)=>{
   try {
       let email = req.params.email
       let query = {email:email}
       let otp = Math.floor(100000 + Math.random() * 900000)
       const user = await UserModel.findOne(query)
       if(!user){
       res.status(400).json({status: "fail", data: "User not found"})
       }
      else{
       //Step 1
       let creatOtp = await OtpModel.create({email:email, otp:otp})
       //Step 2
       let sendEmail = SendEmailUtility(email,"To-Do_Lister Password Verification", `Your OTP is ${otp}`)
       res.status(200).json({status:"Sucess", data: "OTP send successfully"})
      }


   } catch (error) {
       res.status(400).json({status: "fail", data: error.message})
   }
}
//Email Verify End


//OTP verify Start
exports.OtpVerify = async (req, res) => {
   try {
       const email = req.params.email;
       const otp = req.params.otp;
       const status = 0;
       const updateStatus = 1;

       const otpChack = await OtpModel.aggregate([
         {$match:{email:email, otp:otp}},
         {$count:"count"}
       ])

       if(otpChack.length>0){
         let updateOtp = await OtpModel.updateOne({email:email, otp:otp, status: status}, {email:email, otp:otp, status:updateStatus})
         res.status(200).json({ status: "success", data: "OTP verified successfully" });
      }
      else{
         res.status(200).json({ status: "fail", data: "Invalid OTP" });
      }
     
   } catch (error) {
       res.status(400).json({ status: "fail", data: error.message });
   }
};
//OTP verify End

//Rest passWord start
exports.resetPassword = async (req, res)=>{
   try {
      let email = req.body.email;
      let otp = req.body.otp;
      let updatePassword = req.body.password;
      let updateStatus = 1;

      const otpChack = await OtpModel.aggregate([
         {$match:{email:email, otp:otp, status:updateStatus}},
         {$count:"total"}
      ])
      if(otpChack.length>0){
         let passwordUpdate = await UserModel.updateOne({email:email}, {password:updatePassword})
         res.status(200).json({ status: "success", data: "Password reset successfully" });
      }
      else{
         res.status(200).json({ status: "fail", data: "Invalid OTP" });
      }
   }
   catch (error) {
       res.status(200).json({status: "fail", data: error });
   }
   
}
//Rest passWord end



