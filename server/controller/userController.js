const User = require('../model/userModel'); // '../folder-name/file-name'
const sendEmail = require('../SendGrid/emailService');
/*This imports the `User` model (Mongoose schema).
 You're pulling it in from the `userModel.js` file from the `model` folder.
 This model allows you to create and interact with user data in your MongoDB collection.*/

const create = async (req, res) => {           //async can handle multiple requests
    //it refers to an inbuilt asynchronous(late replies) function async which takes in two parameters (req,resp). async function tells that the work is going to take some time so dont wait and continue working 
    try {
        // 💡 Check if a user with the same email already exists
        const existingUser = await User.findOne({ email: req.body.email });
        if (existingUser) {
            return res.status(409).json({ msg: "User with this email already exists" });
        }

        const userData = new User(req.body);  //You're creating a new instance/row/entry of the User model .(POST /users → Create(post) a new user) ...so whatver data we are entering it will go in user body and will be provided to our model
        if (!userData) {
            return res.status(404).json({ msg: "User data not found" });
        }
        const savedData = await userData.save();
        await sendEmail({
            to: savedData.email,
            subject: "Welcome to the App!",
            text: `Hi ${savedData.fname}, your account has been created successfully.`
        })
        res.status(200).json(savedData);

    } catch (error) {
        res.status(500).json({ error: error });
    }
};




const fetch = async (req, res) => {
    try {
        const users = await User.find(); // find fetches data for us
        if (users.length === 0) {
            return res.status(404).json({ message: "User not found" });
        }

        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ error: error });
    }
};

const update = async (req, res) => {
    try {
        const email = req.params.email; //stores email as the parameter

        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }

        const updatedUser = await User.findOneAndUpdate(
            { email }, // Find user by email
            req.body,  //Update their info with data from request
            { new: true }  //return the updated document
        );

        await sendEmail({
            to: updatedUser.email,
            subject: "Your Account Was Updated",
            text: `Hi ${updatedUser.fname}, your account information has been updated.`
        });

        res.status(200).json(updatedUser);

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};




const deleteUser = async (req, res) => {
    try {
        const email = req.params.email;

        const userExists = await User.findOne({ email });
        if (!userExists) {
            return res.status(404).json({ message: "User not found" });
        }
       //// This will only run if the above if (condition)is false
        await User.findOneAndDelete({ email });

        await sendEmail({
            to: userExists.email,
            subject: "Account Deleted",
            text: `Hi ${userExists.fname}, your account has been deleted from our system.`
        });

        res.status(200).json({ message: "Deleted successfully" });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};


module.exports = { create, fetch, update, deleteUser };
