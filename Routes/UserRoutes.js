const express = require('express');
const {register,login,allusers} = require("../Controllers/UserController")

const router = express.Router();


router.post("/register",register)
router.post("/login",login)
router.get("/allusers/:id",allusers)


module.exports = router;