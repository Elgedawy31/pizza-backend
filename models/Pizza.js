const mongoose = require('mongoose');

const shcema = mongoose.Schema

const pizzaSchema=new  shcema( {
    name: {
        type:String ,
        require
    },
    varients: [] ,
    prices:[],
    category:{type:String , require},
    image:{type:String , require},
    desc:{type:String , require}

},{
    timestamps:true
});


const PizzaModel = mongoose.model('Pizza' , pizzaSchema);


module.exports = PizzaModel