const express = require("express")

const router = express.Router()
const songController = require("../controller/song.controller")
const upload = require("../middlewares/upload.middleware")

router.post("/",upload.single("song"), songController.uploadSong)
router.get("/", songController.getSong)


module.exports=router