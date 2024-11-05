import express from "express";
const router = express.Router();

import {getStickers} from "../controller/sticker.controller.js";
import {createSticker} from "../controller/sticker.controller.js";
import {updateSticker} from "../controller/sticker.controller.js";
import {deleteSticker} from "../controller/sticker.controller.js";

//route that is listening to a GET method
//GET ALL Stickers from the Database
router.get("/", getStickers);

//route that is listening to a PATCH method
//use PATCH when updating one sticker
//use PUT when updating all stickers
router.put("/:id", updateSticker)

//route that is listening to a POST method (CREATE)
router.post("/", createSticker);

//route that is listening to a DELETE method
//(:id) means that the value is dynamic and takes any string value the user can pass

router.delete("/:id", deleteSticker);


export default router;