
const asyncHandler=require('express-async-handler')
const Goal=require('../model/goalModel')
const User=require('../model/userModel')



//Get gouls
const getGoals=asyncHandler(async(req,res)=>{
    const goals=await Goal.find({user:req.user.id})
    res.status(200).json(goals)
})
//Post gouls
const setGoals=asyncHandler(async(req,res)=>{
    if(!req.body.text){
        res.status(400)
        throw new Error('Please add a text field')

    }
    const goal=await Goal.create({
        text:req.body.text,
        user:req.user.id
    })
        res.status(200).json(goal)

})
//Update goals
const updateGoals=asyncHandler(async(req,res)=>{
    const goal=await Goal.findById(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    
    const updatedGoal=await Goal.findByIdAndUpdate(req.params.id,req.body,{new: true,})
    res.status(200).json(updatedGoal)
})

//Delete goals
const deleteGoals=asyncHandler(async(req,res)=>{
    const goal=await Goal.findByIdAndDelete(req.params.id)
    if(!goal){
        res.status(400)
        throw new Error('Goal not found')
    }
    await goal.remove()
    res.status(200).json({id:req.params.id})
})



module.exports={
    getGoals,
    setGoals,
    updateGoals,
    deleteGoals
}