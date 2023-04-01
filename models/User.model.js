const mongoose = require('mongoose');
const shcema = mongoose.Schema;

const UserShhema = new shcema ({
    email:{
        type:String , 
        required:true
 
         
    },
    username:{
        type:String , 
        required:true
    },
    password:{
        type:String , 
        required:true ,
    },
    phone:String ,
    image:String
},
{timestamps:true}

)


const UserModel = mongoose.model('user' , UserShhema);


module.exports  = UserModel  