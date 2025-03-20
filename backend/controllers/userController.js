const client = require("../config/db");
const bcrypt=require("bcryptjs");
const {generateToken}=require("../utils/jwt")



exports.getAllUsers = async (req, res) => {
    try {
        // Fetch all users from the database
        const users = await client.query("SELECT name, mailid, mobile_number FROM users");

        if (users.rowCount === 0) {
            return res.status(404).json({ 
                message: "No users found!", 
                status: 404 
            });
        }

        return res.status(200).json({ 
            message: "Users retrieved successfully!", 
            status: 200,
            users: users.rows
        });

    } catch (err) {
        console.error(err.message);
        res.status(500).send("Server error");
    }
};


exports.validateUsers = async (req, res) => {
    const {emailOrmobile,password} = req.body;
    try {
        let users=await client.query("select mailid, mobile_number, password from users where mobile_number=$1 or mailid=$1",[emailOrmobile]); 
        
        if(users.rowCount==0) 
            {
                return res.status(404).json({ 
                    message: "User not found! Please register to continue.", 
                    status: 404 
                });
            }
        const user= users.rows[0]
        const hashedPassword=user.password;
        if(await bcrypt.compare(password,hashedPassword))
        {
            const token = generateToken(user);
             res.status(200).json({
                message:"Login Successfull",
                status:200,
                user,
                token : token
            });
        }
        else
        {
            return res.status(401).json({ 
                message: "Incorrect Password or Mailid", 
                status: 401
            });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

exports.createUser = async (req, res) => {
    const { name, mail, mobile, password } = req.body;
    try {
        const existingUser = await client.query("SELECT * FROM users WHERE mobile_number = $1", [mobile]);

        if (existingUser.rowCount > 0) {
            return res.status(409).json({ 
                message: "User already exists! Please log in instead.", 
                status: 409 
            });
        }
        // Encrypt the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Insert user into database
        const newUser = await client.query(
            "INSERT INTO users (name, mailid, mobile_number, password) VALUES ($1, $2, $3, $4) RETURNING *",
            [name, mail, mobile, hashedPassword]
        );

        const user = newUser.rows[0]; // Extract the inserted user details

        return res.status(201).json({ 
            message: "Registered successfully!", 
            status: 201,
            user: user
        });
        
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
