const UserModel = require("../models/user.model");
const jwt = require("jsonwebtoken");

const registerUser = async (req, res) => {
  try {
    // console.log(req.body);
    const { firstName, lastName, email, password ,repeatPassword} = req.body;
    if (!firstName || !email || !password||!repeatPassword) {
      return res.status(400).send("All details required");
    }
    if (password !== repeatPassword) {
      return res.status(400).send("Repeat Passowrd not matched");
    }

    const isExistUser = await UserModel.findOne({ email });
    if (isExistUser) {
      return res.status(400).json("User Already exits");
    } else {
      const newUser = await new UserModel(req.body);

      await newUser.save();

      // console.log("new user is : ", newUser);
      return res.status(201).send("User created succefully");
    }
  } catch (error) {
    return res.status(500).send("Internal server error");
  }
};

const loginUser = async (req, res) => {
  try {
    // console.log(req.body);
    const { email, password } = req.body;
    if (!email) {
      return res.status(400).json({msg:"Email id not entered"});
    }
    if (!password) {
      return res.status(400).json({msg:"Password not entered"});
    }
    const isExistUser = await UserModel.findOne({ email });
    // console.log(isExistUser);
    if (!isExistUser) {
      return res.status(404).json({ msg: "User not found" });
    }
    const passwordMatch = await isExistUser.comparePassword(password); //password compare
    // console.log(passwordMatch);
    // if(!passwordMatch){
    //   res.json({msg:"Invalid credentials"})
    // }
    if (passwordMatch) {
      const token = await isExistUser.generateToken();
      const { firstName, isAdmin } = isExistUser;
      return res
        .status(200)
        .json({ msg: "Login successfully", firstName, isAdmin, token });
    } else {
      return res.status(401).json({ msg: "Email or password not match" });
    }
  } catch (error) {
    return res.status(500).json({msg:"Internal server error"});
  }
};

const allUsers = async (req, res) => {
  const { isAdmin } = req.user;
  try {
    if (isAdmin != "true") {
      return res.status(403).send("Unauthorized access");
    }
    const AllUser = await UserModel.find().select("-password");
    if (!AllUser) {
      return res.status(404).send("User not registered yet");
    }
    res.status(200).json(AllUser);
  } catch (error) {
    res.status(500).send("Internal Server Error");
  }
};

const deleteUser = async (req, res) => {
  const _id = req.params.id;
  const { isAdmin } = req.user;
  try {
    if (isAdmin != "true") {
      return res.status(403).send("Unauthorized access");
    }
    const deletedUser = await UserModel.findByIdAndDelete({ _id });
    // console.log(deletedUser);
    if (!deletedUser) {
      throw new Error("User neither found nor deleted");
    }
    res.status(200).json({ msg: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = { registerUser, loginUser, allUsers, deleteUser };
