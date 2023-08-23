const express = require('express');
const router = express.Router()
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const userdata = require('../Modle/user.moudle');
const auth = require('../Middlewar/Auth');
const cloudinary = require('../db/cloudinary')
const uploader = require("../db/multer");
const cardata = require('../Modle/Cars.moudle');
const fs = require('fs');
const path = require('path');
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
        //delete the file from local storage after uploading to cloundinary
        console.log(req.file.path)
        const filename = path.join(__dirname, 'download.jpeg');

        // Use fs.unlink to delete the file
        fs.unlink(filename, (err) => {
          if (err) {
            console.error(`Error deleting file: ${err.message}`);
          } else {
            console.log(`File ${filename} deleted successfully.`);
          }
        });
        console.log(upload);
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
router.get("/allcars",async function (req, res){
    /* const cars = await cardata.findAll();*/
    try{
        const query = req.query;
        let cars = await cardata.find();
        
        if (query.price !== 'All') {
          if (query.price === 'hightolow') {
            cars.sort((a, b) => {
              return Number(b.price) - Number(a.price);
            });
          } else {
            cars.sort((a, b) => {
              return Number(a.price) - Number(b.price);
            });
          }
        }
        if (query.mileage !== 'All') {
          cars=cars.filter((el,i)=>{
            console.log(cars);
            return( Number(el.mileage)>=Number(query.mileage.low)&&Number(el.mileage)<=Number(query.mileage.high))
           })
          }
          if (query.color !== 'All') {
           cars=cars.filter((el,i)=>{
            return el.color.trim().toLowerCase().replace(/\s+/g, "")==query.color.trim().toLowerCase().replace(/\s+/g, "")
           })
          }
        
        // Send the sorted or unsorted data
        res.send(cars);
    }catch{
        return res.json({"message":"No Cars Found"})
    }
       
})
router.delete("/delete/:id",auth,async function (req, res){
    try{
        const {id} = req.params;
        const cars = await cardata.findByIdAndDelete(id)
        res.send('delete')
    }catch{
        return res.json({"message":"No Cars Found"})
    }
       
})
router.patch("/update/:id",auth,async(req,res)=>{
    const {id}= req.params
    await cardata.findByIdAndUpdate(id,{...req.body})
    res.send("done")
})
module.exports = router