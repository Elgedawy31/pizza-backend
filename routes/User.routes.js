const express = require('express');
const UserModel = require('../models/User.model');
const router = express.Router();
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const auth = require('../services/auth');
const multerFunc = require('../services/multer');

router.post('/signup' , multerFunc().single('image') ,async (req, res) => {


 
    try {

    const {username , password , email  , phone , CPass} = req.body

    const  fileName = `${req.protocol}://${req.headers.host}/${req.destFile}/${req.file.filename}`


        if(password === CPass ){


            try {

                bcrypt.hash(password , 10 , async(err , hashed) => {


                    const data = new UserModel({username , password:hashed , image:fileName ,  email , phone , CPass})
    
                const savedData = await data.save();
    
                const token = jwt.sign({id:data._id} , 'elsaid hamdy' )

                res.status(200).json({message:'done' , savedData , token})
    
                })
                
            } catch (error) {
                
                res.status(500).json({error})
            }
        }else{
            res.status(500).json({error:'Password Is not cpassord'})
        }

        
        
    } catch (error) {
        
        res.status(500).json({error})
    }




})
router.post('/signin' ,async (req, res) => {


    const {username , password } = req.body

    try {



            const hashedPassword = await UserModel.findOne({username})



            try {

                bcrypt.compare(password , hashedPassword.password ,async (err , same) => {

                    if(same) {

                        const data = await UserModel.findOne({username})

                        const token = jwt.sign({id:data._id} , 'elsaid hamdy' )

                        res.status(200).json({message:'done' , data , token})


                    }else{
                        res.status(500).json('not valid password or username')
                    }
                })


                
                
            } catch (error) {
                
                res.status(500).json({error})

            }

            


        
    } catch (error) {
        
        res.status(500).json({error})
    }




})


router.get('/getuser' , auth() , async(req , res) =>{


    const user = await UserModel.findById(req.user.id)

    res.status(200).json({user})
    


} )

















module.exports = router