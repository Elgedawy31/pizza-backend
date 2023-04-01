const express = require("express");
const PizzaModel = require("../models/Pizza");
const router = express.Router();
const multerFunc = require('../services/multer.js')


router.post('/addpizza' ,  multerFunc().single('image') , async (req , res) => {


    // console.log(req.body)
    // console.log(req.file)


    // console.log(req.file)


    try {

      const { name, category , desc }  = req.body


      const  fileName = `${req.protocol}://${req.headers.host}/${req.destFile}/${req.file.filename}`





        const AddedPizza  = new PizzaModel({name , varients:["small", "medium", "large"] , prices : [{ small: 200, medium: 350, large: 400 }], image:fileName  , category , desc})
    
        const savedData = await AddedPizza.save();

        res.status(200).json({savedData})
        
    } catch (error) {
        res.status(500).json({error})
    }

    
})

router.get('/getallpizass' , async (req, res) => {

    try {

    const PizzaData = await PizzaModel.find()

    res.status(200).json({PizzaData})

        
    } catch (error) {
        res.status(500).json({error})
    }
    
})


router.delete('/delete' ,async (req , res) => {


    const data =await  PizzaModel.deleteMany()


})

module.exports = router