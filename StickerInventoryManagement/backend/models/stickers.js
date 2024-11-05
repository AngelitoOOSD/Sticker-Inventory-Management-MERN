import mongoose from "mongoose";

//create a schema - the sticker will have a name, price, and image
const stickerSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    } ,
    image: {
        type: String,
        required: true
    }
}, {
    timestamps: true //createdAt, updatedAt //whenever you create a sticker, this timestamps makes sure 
                                            // that it has the created at and updated at fields on each document*/
});


//now that the schema is created above, we can create the model
const Stickers = mongoose.model('Sticker', stickerSchema); //it is saying to mongoose to create a model or collection 
                                                           //called Sticker and use and follow this specific schema (stickerSchema)
                                                           //'Sticker' is capitalized because mongoose takes that value and makes it lower case and plural (ex: stickers)
//export sticker to be used in other files
export default Stickers;