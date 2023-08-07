const User = require("../Models/UserModal");
const bcrypt = require("bcrypt");

const register = async (req, res) => {
 
  try {
    const { email, password, username } = req.body;
    const UserNameCheck = await User.findOne({ username });
    if (UserNameCheck)
      return res.json({ msg: "Username Already Used", status: false });
    const EmailCheck = await User.findOne({ email });
    if (EmailCheck)
      return res.json({ msg: "Email Already Used", status: false });

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      email,
      username,
      password: hashedPassword,
    });
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
  }
};
const login = async (req, res) => {
  try {
    const { password, username } = req.body;
    const user = await User.findOne({ username });
    if (!user) return res.json({ msg: "  Invalid Username", status: false });
    const PasswordCheck = await bcrypt.compare(password, user.password);
    if (!PasswordCheck) {
      return res.json({ msg: "Invalid Password", status: false });
    }
    return res.json({ status: true, user });
  } catch (error) {
    console.log(error);
  }
};

const allusers = async(req,res)=>{

  try{
      const users = await User.find( {_id:{$ne:req.params.id} }).select([
        "username",
        "email",
        "_id",
        "avatarImage"
      ])
     
      res.send(users)
     
      
  }catch(error){
    console.log(error)
  }
 
}

module.exports = { register, login,allusers };
