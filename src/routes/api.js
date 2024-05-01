const express = require("express");
const router = express.Router();
const UserControllar = require("../controllar/UserControllar");
const AuthVarifyMiddleware = require("../middleware/AuthVarifyMiddleware");
const TodoControllar = require("../controllar/TodoControllar");
const TestControllar = require("../controllar/TestControllar");


//user api router start
router.get("/test", TestControllar.test);
   
router.get("/product-list/:pageNumber/:perPage/:searchKeyword", UserControllar.ProductSearchAndPaiganation);
router.post("/registration", UserControllar.Registration);
router.post("/login", UserControllar.Login);
router.post("/user-profile-update", AuthVarifyMiddleware, UserControllar.UpdateProfile);

router.get("/Profile-details", AuthVarifyMiddleware, UserControllar.ProfileDetails);
router.get("/email-verify/:email", UserControllar.EmailVerify);
router.get("/otp-verify/:email/:otp", UserControllar.OtpVerify);
router.post("/rest-password", UserControllar.resetPassword);
//user api router end

//todo api router start
router.post("/create-todo", AuthVarifyMiddleware, TodoControllar.createTodo);
router.get("/todo-update-status/:id/:status", AuthVarifyMiddleware, TodoControllar.updateTodo);
router.get("/delete-todo/:id", AuthVarifyMiddleware, TodoControllar.deleteTodo);
router.get("/todo-list-by-status/:status", AuthVarifyMiddleware, TodoControllar.TodoListByStatus);
router.get("/todo-count-by-status/:status", AuthVarifyMiddleware, TodoControllar.TodoCountByStatus);
//todo api router end



module.exports = router