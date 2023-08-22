const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userdata = require('../Modle/user.moudle');
const auth = require('../Middlewar/Auth');
const cloudinary = require('../db/cloudinary')
const uploader = require("../db/multer");
const cardata = require('../Modle/Cars.moudle');
// routes
router.post('/login', async (req, res) => {
    try {
        const body = req.body;
        let findone=await userdata.find({ email: body.email })
        if (!findone[0]) return res.status(422).send("Invalid Email");
        var passwordIsValid = await bcrypt.compareSync(body.password,findone[0].password);
            // check for a valid login
            console.log(passwordIsValid,"<PASSWORD>",findone)
        
            if(!passwordIsValid){
                throw new Error();
                }else{
                   const payload={
                    id:findone[0]._id,
                    name:findone[0].name,
                    email:findone[0].email}
                    const token=jwt.sign(payload,'naren');
                    res.send({token:token})
                    };

    } catch (error) {
        res.status(500).send("error");
    }
})
router.post('/token', async (req, res) => {
    try {
        const body = req.headers.token;
        const decodedToken = jwt.verify(body,'naren')
        const findone = userdata.findById(decodedToken.id);
        if (!findone)return  res.status(417).send("invalid Token")
        else {
            delete decodedToken.id
            delete decodedToken.iat
            console.log(decodedToken)
            res.send(decodedToken)
        }

    } catch (error) {
        res.status(500).send("error");
    }
})
router.post('/singup', async (req, res) => {
    try {
        const body = req.body;
        if (body.name && body.email && body.password) {
            let findone=await userdata.find({ email: body.email })
            if (findone.length==0) {
                let hash = bcrypt.hashSync(body.password, 10);
                body.password = hash;
                var data = await userdata.create({ ...body })
                var withoutpass = {name:data.name,email:data.email}
                console.log(withoutpass);
                const token = jwt.sign(withoutpass, "naren")
                res.send({ token: token })
            }
            else {
                res.status(400).send("Email id persent")
            }


        }
        else {
            res.status(400).send("All data Not Provide")
        }

    } catch (error) {
        res.status(400).send(error);
    }
})
router.post('/uploadimg', auth,uploader.single("file"), async (req, res) => {
    try {
        const upload = await cloudinary.v2.uploader.upload(req.file.path);
        res.send(upload.secure_url)
    } catch (error) {
        res.status(400).send(error);
    }
})
router.post('/addcar', auth, async (req, res) => {
    try {
        const body = {...req.body,user:req.user}
        console.log(body);
         await cardata.create({...body})
         res.send("done")
    } catch (error) {
        res.status(400).send(error);
    }
})
module.exports = router