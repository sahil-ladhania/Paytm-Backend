import { User } from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const userSignup = (req , res) => {
    // Get the Data From Body Object
    const firstName = req.body.firstName;
    console.log(firstName);
    const lastName = req.body.lastName;
    console.log(lastName);
    const email = req.body.email;
    console.log(email);
    const password = req.body.password;
    console.log(password);
    // Check If the Input Feilds are Filled
    if(!firstName || !lastName || !email || !password){
        console.log("Pura Form Bhar !!!")
    }
    else{
        // Check if the Email Entered by the User Already Exist or Not
        User.findOne({email : email})
            .then((user) => {
                if(user){                    
                    console.log("Naya Email Daal !!!");
                }
                else{
                    // Hash the Password
                    const hashedPassword = bcrypt.hash(password , 10);
                    hashedPassword
                        .then((hashedPassword) => {
                            console.log(hashedPassword);
                            // Create new User Instance
                            const newUser = new User({
                                firstName : firstName,
                                lastName : lastName,
                                email : email,
                                password : hashedPassword
                            })
                            console.log(newUser);
                            // Save the User in DB
                            newUser.save()
                                .then((savedUser) => {
                                    res.status(201).send({
                                        Message : "User Signup Successfull ...",
                                        SavedUser : savedUser
                                    })
                                })
                                .catch((error) => {
                                    res.status(500).send({
                                        Error : `Error in Saving User : ${error} !!!`
                                    })
                                })
                        })
                        .catch((error) => {
                            res.status(500).send({
                                Error : `Error in Hashing Password : ${error} !!!`
                            })
                        })
                }
            })
            .catch((error) => {
                res.status(500).send({
                    Error : `User Already Exist : ${error} !!!`
                })
            })
    }
}

export const userLogin = (req , res) => {
    // Get the Data From Body Object
    const email = req.body.email;
    console.log(email);
    const password = req.body.password;
    console.log(password);
    // Check If the Input Feilds are Filled
    if(!email || !password){
        console.log("Pura Form Bhar !!!");
    }
    else{
        // Check if the Email Entered by the User Matches the DB Record or Not
        User.findOne({email : email})
            .then((user) => {
                if(!user){
                    console.log("Invalid Credentials !!!")
                }
                else{
                    // Compare the Passwords
                    bcrypt.compare(password , user.password)
                        .then((isPasswordCorrect) => {
                            console.log(isPasswordCorrect);
                            // Generate JWT and Send it to the Client via Cookies
                            const payloadData = {
                                firstName : user.firstName,
                                lastName  : user.lastName,
                                email : user.email
                            };
                            const secret_key = 'IWILLBECOMETHERICHESTMANONEDAYINTHEWORLD';
                            console.log(payloadData);
                            const token = jwt.sign(payloadData , secret_key , {expiresIn : '2h'});
                            console.log(token);
                            res.cookie('JWT-TOKEN' , token , {
                                maxAge: 3600000,
                                sameSite: 'strict'
                            });
                            res.status(200).send({
                                Message : "User Logged In Successfully ...",
                                token : token,
                                userData : {
                                    name : `${user.firstName} ${user.lastName}`,
                                    email : user.email
                                }
                            })
                        })
                        .catch((error) => {
                            res.status(500).send({
                                Error : `Invalid Credentials : ${error} !!!`
                            })
                        })
                }
            })
            .catch((error) => {
                res.status(500).send({
                    Error : `Invalid Credentials : ${error} !!!`
                })
            })
    }
}

export const getAllUsers = (req , res) => {
    // Get all Users From DB
    const users = User.find();
    users
        .then((users) => {
            if(!users){
                console.log("No User Found !!!")
            }
            else{
                res.status(200).send({
                    Message : "Users Listed Successfully ...",
                    usersList : users
                })
            }
        })
        .catch((error) => {
            res.status(500).send({
                Error : `No User Exist : ${error} !!!`
            })
        })
}