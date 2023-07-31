let express = require('express');
let router = express.Router();
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const jwt = require("jsonwebtoken");


router.post('/register', async (_req, res) => {

  console.info('registering user');
  try{
    const { email, password, username } = _req.body;

    let userExists = await User.findOne({ email : email});
    if(userExists) return res.status(403).send({ "email": 'Email already in use.' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({
      email: email,
      username: username,
      password: hashedPassword
    });
    await user.save().then(() => {
      console.info('user saved');
    });
    return res.redirect("/login");
  } catch(err){
    console.error(err);
    return res.status(400).send(err);
  }
});

router.post('/login', async (_req, res) => {
  console.info('logging in user');
  try{
    const { email, password } = _req.body;
    console.info("email "+email);
    console.info("pass "+password);
    console.log(process.env.JWT_SECRET)
    const user = await User.findOne({ email : email });

    if( !user ) return res.status(403).send({ "email": 'Email does not exist' });
    
    bcrypt.compare(password, user.password, (err, result) => {
      if(result){
        const token = jwt.sign({"_id":user._id}, process.env.JWT_SECRET);
        const json = {
          "success": true, 
          "token":token,
          "expiresIn": 3600,
          "authUserState": {
            "email": email,
            "username": user.username
          }
        };
        
        console.info(json);
        return res.send(json);
      }

      console.error(err);
      return res.status(403).send({ "password": 'Password is incorrect' });
    });

  } catch(err){
    console.error(err);
    return res.status(401).send(err);
  }
});

module.exports = router