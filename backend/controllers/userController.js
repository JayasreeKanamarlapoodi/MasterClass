const client = require("../config/db");
const bcrypt=require("bcryptjs");
const {generateToken}=require("../utils/jwt")

exports.validateUsers = async (req, res) => {
    const {mail, mobile,password} = req.body;
    
    try {
        let users=null;
        if(mobile==undefined)
        {
            console.log("mail exists");
         users= await client.query("select mailid, mobile_number, password from users where mailid=$1 ",[mail]);
        }
        else
        {
            console.log("mobile exists");  
        users= await client.query("select mailid, mobile_number, password from users where mobile_number=$1 ",[mobile]); 
        }
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
                message:"Login Successful",
                status:200,
                user,
                token
            });
        }
        else
        {
            return res.status(401).json({ 
                message: "Incorrect password! Please try again.", 
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
            message: "User registered successfully!", 
            status: 201,
            user: newUser 
        });
        
    } 
    catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};
