import jwt from 'jsonwebtoken';

export const verifyJWT = (token , secret_key) => {
    return new Promise((resolve , reject) => {
        jwt.verify(token , secret_key , (error , decodedData) => {
            if(error){
                reject(error);
            }
            else{
                resolve(decodedData);
            }
        })
    })
}