import express from 'express';
import cors from 'cors';
import sqlite3 from 'sqlite3';
import * as sqlite from 'sqlite';

//database initialization
const  db = await sqlite.open({
    filename:  './attendance.db',
    driver:  sqlite3.Database
});
console.log('You are now connected to the database!')
await db.migrate(); 

//express initialization
const app = express();
app.use(express.static('public'));
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3011;
app.listen(PORT, () => console.log(`Taxi App started on port: ${PORT}`))

// Sign-up API
app.post("/api/addUser/", async (req,res)=>{
    const username = await db.get("select username from user where username = ?", req.body.username);
    const email = await db.get("select email from user where email = ?", req.body.email);
    const password = await db.get("select password from user where password = ?", req.body.password);
    if (email){
        res.json({
            error : "Email address already exist!"
        })
    }else if(username){
        res.json({
            error : "Username already exist!"
        })
    }
    else if (password){
        res.json({
            error : "Password already exist!"
        })
    }
    else {
        await db.run("insert into user (firstName,surname,email,username,password,userType) values (?, ?, ?, ?, ?, ?);", [req.body.firstName, req.body.surname, req.body.email, req.body.username, req.body.password, req.body.userType]);
        if(req.body.userType=="admin"){
            const userId = await db.get("select id from user where username=?", req.body.username);
            await db.run("insert into admin (userId, username) values (?, ?);", [userId.id, req.body.username]);
        }else{
            const userId = await db.get("select id from user where username=?", req.body.username);
            console.log(userId);
            await db.run("insert into attendee (userId, username) values (?, ?);", [userId.id, req.body.username]);
        }
        res.json({
            success : "Registration successful!"
        })
    }

app.get('/api/login/',async (req,res)=>{
     const results=await db.get('select username,userType,password from user where username=? and password=?',[req.body.username,req.body.password]);
     console.log(results);
     res.json({
        password:results.password,
        username:results.username,
        userType:results.userType,
        status:"passed"
     })
})
});




// const results=await db.get("select username,userType,password from user")
// const username=results.username;
// const userType=results.userType;
// const password=results.password;
// console.log("username :"+username+ " password :"+password+" userType:"+userType)