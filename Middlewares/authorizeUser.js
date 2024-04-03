import jwt from 'jsonwebtoken'
import { verifyJWT } from '../Helpers/VerifyJWT.js';

const secret_key = 'IWILLBECOMETHERICHESTMANONEDAYINTHEWORLD';

export const isUserAuthorized = (req , res , next) => {
    const token = req.headers.authorization;
    if(!token){
        console.log("No Token in AuthZ Header !!!");
    }
    else{
        console.log(token);
        const TOKEN = token.split(' ')[1];
        console.log("Actual Token :- " , TOKEN);
        // Verifying The JWT
        verifyJWT(TOKEN , secret_key)
            .then((decodedData) => {
                console.log(decodedData);
                next();
            })
            .catch((error) => {
                res.status(500).send({
                    Error : `Authorization Failed : ${error} !!!`
                })
            })
    }
}