const express = require("express");
const User = require("../Models/UserModel");
const bcrypt = require("bcrypt");


const  login  =async (req, res) => {
    try {
      // verfity the user passwprd
      // redirect to role of the user

      const { email, password } = req.body;

      // find user by unique email

      const user = await User.findOne({ email });
      // console.log(user);

      //if no user throw an error
      if (!user) {
        return res.status(404).send("User not found" );
      }

      // Verify the password
      const isPasswordValid = await bcrypt.compare(password, user.passwordHash);

      if (!isPasswordValid) {
        return res.status(401).json({ message: "Invalid password" });
      }

      // find the user role
      let role = "";
      if (user.role === "hr") {
        role = "hr";
     
      } else if (user.role === "Employee") {
        role = "Employee";
      } 
     
      res.status(200).json({ message: "Login successful", role });
    } catch (error) {
      res
        .status(400)
        .send("sorry it seems there is trouble accessing this page");
      console.log(error);
    }
  }

 const  signUp = async (req, res) => {
    const saltRounds = 10;
    try {
      const {
          name,
         email,
         role,
         department,
         password
     
     } = req.body;
        const passwordHash = await bcrypt.hash(password, saltRounds);
      const user = new User({
          name,
          email,
          role,
          department,
          passwordHash
      });

      const data = await user.save();

      res.status(200).json(data);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: "An error occurred while signing up." });
    }
  }

  module.exports = {login,signUp}
