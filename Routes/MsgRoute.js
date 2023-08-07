const express = require('express');
const { addMessage, getMessages } = require("../Controllers/MessageController");

const router = express.Router();


router.post("/addmsg",addMessage)
router.post("/getmsg",getMessages)


module.exports = router;