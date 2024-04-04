import { User } from '../Models/userModel.js';

export const searchUser = (req , res) => {
    // Getting the Data From Body Object
    const userName = req.body.name;
    console.log(userName);
    // Checking if the user has entered any name or not
    if(!userName){
        console.log("Kuch Search to Kar !!!");
    }
    else{
        // Get the First Name and Last Name from the userName
        const fullName = userName.split(' ');
        console.log(fullName);
        const firstName = fullName[0];
        console.log(firstName);
        const lastName = fullName[1];
        console.log(lastName);
        // Implement Partial and Case Insensitive Search
        const searchPattern = new RegExp('^' + userName , 'i');
        console.log(searchPattern);
        // Search all the User with the First Name and List all of them
        User.find({firstName : {$regex : searchPattern}})
            .then((users) => {
                if(users.length === 0){
                    console.log("No Users Found With That Name !!!");
                }
                else{
                    res.status(200).send({
                        Message : "All Users With Names Starting Are Listed ...",
                        UsersList : users
                    })
                }
            })
            .catch((error) => {
                res.status(500).send({
                    Error : `Error Occured While Search User : ${error}`
                })
            })
    }
}