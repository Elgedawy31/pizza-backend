const jwt = require('jsonwebtoken')
const auth = () => {

    return( req , res , next) =>{

        const aothor =req.headers.authorization



        if(aothor){

            try {
                const tocken = aothor.split(' ')[1]

            const data = jwt.verify(tocken , 'elsaid hamdy')

            req.user = data ;

            next()
            } catch (error) {
            res.status(500).json({error:'error in token'})
                
            }

        }else{
            res.status(500).json({error:'error in token'})
        }

    }
}



module.exports = auth 