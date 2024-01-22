const User = require("../Models/UserModel")

const  getUsers =  async (req, res)=>{
    try{
     const users = await User.find();
     res.status(200).json(users)
    }
    catch (error){
     res.status(500).json({ message:"user cant be got ", errorMessage:error.message});
}
}

const  getSingleUser =  async (req, res)=>{
   try {
      const user = await User.findOne({ _id: req.params.id });
  
      if(!user){
        return res.status(404).json({error:"user not found"})
      }

      res.status(200).json(user);
    } catch (error) {
     res.status(500).json({ message:"user cant be found", errorMessage:error.message});
    }
 }
const addUser = async (req,res)=>{
     try {
         const {name, email,role,department} = req.body;
          const user = new User({
               name,
               department,
               email,
               role
               
          })
          await user.save()
          res.status(200).json({ message:"user added as a successfully",user});
     } catch (error) {
          res.status(500).json({ message:"user cant be added", errorMessage:error.message});
     }
} 

const updateUser = async (req, res)=>{
     try {
          const user = await User
          .findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
          );
      if(!user){
        res.status(404).json({Message:"user not found"})
      }
          res.status(200).json(user);
     
          
     } catch (error) {
          res.status(500).json({ message:"user cant be updated", errorMessage:error.message});
     }
}


module.exports = {getUsers, addUser,updateUser,getSingleUser}