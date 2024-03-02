const express=require("express");
const { allUsers, registerUser, loginUser, deleteUser} = require("../controllers/user.controller");
const Auth = require("../middleware/Auth.middleware");

const userRouter= express.Router();


userRouter.route("/register").post(registerUser);
userRouter.route("/login").post(loginUser);
userRouter.route("/allusers").get(Auth,allUsers);
userRouter.route("/delete-user/:id").delete(Auth,deleteUser);


module.exports=userRouter;
