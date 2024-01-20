const Benefit = require("../Models/Benefit")

const  getBenefits =  async (req, res)=>{
    try{
     const benefits = await Benefit.find();

     if(!benefits){
          return res.status(404).json({error:"no benefits found"})
        }
     res.status(200).json(benefits)
    }
    catch (error){
     res.status(500).json({ message:"benefits cant be got ", errorMessage:error.message});
}
}

const  getSingleBenefit =  async (req, res)=>{
   try {
      const benefit = await Benefit.findOne({ _id: req.params.id });
  
      if(!benefit){
        return res.status(404).json({error:"benefit not found"})
      }

      res.status(200).json(benefit);
    } catch (error) {
     res.status(500).json({ message:" benefit cant be found", errorMessage:error.message});
    }
 }
const addBenefit = async (req,res)=>{
     try {
         const {name, description,  eligibilityCriteria} = req.body;
          const benefit= new Benefit({
               name,
               description,
          eligibilityCriteria,
          
          })
          await benefit.save()
          res.status(200).json({ message:"benefit added as a successfully",benefit});
     } catch (error) {
          res.status(500).json({ message:"benefit cant be added", errorMessage:error.message});
     }
} 

const updateBenefit = async (req, res)=>{
     try {
          const benefit = await Benefit
          .findOneAndUpdate(
            { _id: req.params.id },
            req.body,
            { new: true }
          );
      if(!benefit){
        res.status(404).json({Message:"benefit not found"})
      }
          res.status(200).json(benefit);
     
          
     } catch (error) {
          res.status(500).json({ message:"benefit cant be updated", errorMessage:error.message});
     }
}


module.exports = {getBenefits, addBenefit,updateBenefit,getSingleBenefit}