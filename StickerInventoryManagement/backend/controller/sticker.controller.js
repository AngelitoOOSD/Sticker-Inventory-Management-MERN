import Stickers from "../models/stickers.js";
import mongoose from "mongoose";


//GET controller
export const getStickers = async (req, res) => {
    try{
        const stickers = await Stickers.find({});
        res.status(200).json({success:true, data:stickers})
    }catch (error){
        res.status(500).json({success:false, message: "Server Error"});
    }
}

//POST controller
export const createSticker = async (req, res) => {
    const sticker = req.body; //USER will send this data

    //if the values of the stickers are empty
    if(!sticker.name || !sticker.price || !sticker.image) {
        return res.status(400).json({ success:false, message: "Please provide all fields"});
    }

    //else, if the sticker values are filled out, CREATE A NEW STICKER
    const newSticker = new Stickers(sticker); //Stickers is called from the stickers.js file from the Stickers object
                                              //place the sticker body that we received from the USER
    try {
        await newSticker.save(); //THIS WILL SAVE THE NEW STICKER TO THE DATABASE
        res.status(201).json({ success: true, data: newSticker});
    } catch (error) {
        console.error("Error in Create sticker", error.message);
        res.status(500).json({success: false, message: "Server Error"});
    }
}

//PUT controller
export const updateSticker = async (req, res) => {
    const {id} = req.params;

    const stickers = req.body;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Invalid Sticker ID"});
    }
    try {
        const updatedSticker = await Stickers.findByIdAndUpdate(id, stickers, {new:true});
        res.status(200).json({success: true, data:updatedSticker});
    }catch (error){
        res.status(500).json({success:false, message: "Server Error"});
    }
}

//DELETE controller
//1. get the ID from the url
//de-structure the ID using curly brackets ({id}) that is coming from the user request params (req.params)
export const deleteSticker = async (req, res) => {
    const {id} = req.params;

    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({success:false, message:"Invalid Sticker ID"})
    }
    try{
        await Stickers.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Sticker deleted"});
    }catch (error){
        console.log("Error in deleting sticker:", error.message);
        res.status(500).json({ success: false, message: "Server error"});
    }
}


