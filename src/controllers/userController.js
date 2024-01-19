const User = require("../Models/UserModel")

const  getUsers =  async (req, res)=>{
    try{
     const users = await User.find();
     res.status(200).json(users)
    }
    catch (error){
     res.status(500).send("cant find users");
}
}
const addUser = async (req,res)=>{
     try {
         //const {name, email,role,department} = req.body
          const user = new User(req.body)
          await user.save()
          res.status(200).json({ message:"user added as a successfully",user});
     } catch (error) {
          res.status(500).json({ message:"user cant be added", errorMessage:error.message});
     }
} 
module.exports = {getUsers, addUser}