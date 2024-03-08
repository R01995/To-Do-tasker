const jwt = require("jsonwebtoken");

//AuthVarifyMiddleware start 

module.exports = (req, res, next) => {
  let token = req.headers["token"];
  jwt.verify(token, "12345678", (err, decoded) => {
      if (err) {
          return res.status(401).json({ status:"fail", message: "Unauthorized User" });
      }
      else {
          let email = decoded.data;
          req.headers.email = email;
          next();
      }
  })             
}

//AuthVarifyMiddleware end