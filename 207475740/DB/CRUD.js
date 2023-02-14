    const connection = require("./db");     
    const sql = require("./db");


    const createNewUser = (req, res) => {
        // validate request
        console.log("in create new user");
        if (!req.body) {
            res.status(400).render('ResultsPage', { v1: "content can not be empty!" });
            return;
        }
        const newUser = {
            "first_name": req.body.first_name,
            "last_name": req.body.last_name,
            "username": req.body.username,
            "email": req.body.email,
            "password": req.body.password,
        }

        // run query
        const Q1 = "INSERT INTO USERS SET ?";
        connection.query(Q1, newUser, (err, mysqlres) => {
            if (err) {
                console.log("error:", err);
                res.status(400).render('ResultsPage', { v1: "error in creating user: " + err});
                return;
            }
            console.log("created user:", { uname: newUser.username });
            res.cookie('username', newUser.username, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
            res.render('ResultsPage', { 
                loggedInUser: newUser.username,
                v1: "Hi " + newUser.username + " happy to have you here!" 
            });
            return;
        });
    };


    // findUser
    const findUser = (req,res)=>{
        // validate body exists
        if (!req.body) {
            res.status(400).send({message: "please fill username to search"});
            return;    
        }
        // pull data from body
        const username = req.query.username;
        const password = req.query.password;
        const user = [username, password];
        
        // run query
        const Q2 = "SELECT * FROM USERS WHERE username like ? and password like ?";
        sql.query(Q2, user, (err, mysqlres)=>{
            if (err) {
                console.log("error: ", err);
                res.status(400).send({message:"could not search user"});
                return;
            }
            //if user not found 
            if (mysqlres.length == 0){
                console.log("error: user could not be found");
                res.render('ResultsPage', {
                    v1: "We are sorry " + username + ", it seems like you do not have an account. please check out our sign up option :)", 
                })
                return;
            }
            // console.log(mysqlres)
            console.log("found user: ", mysqlres);

            res.cookie('username', mysqlres[0].username, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
            res.render('ResultsPage', { 
                loggedInUser: mysqlres[0].username,
                v1: "Welcome back " + mysqlres[0].username + ", it is good to have you here!" 
            });
            return;
        });
    };



    // insert new place
    const createNewPlace = (req, res) => {
        // validate request
        if (!req.body) {
            res.status(400).send({ message: "content can not be empty!" });
            return
        }
        // insert input data from body into jason
        const newPlace = {
            "place_name": req.body.place_name,
            "street_name": req.body.street_name,
            "street_number": req.body.street_number,
            "city": req.body.city,
            "google_site": req.body.google_site,
            "openHSunThur": req.body.openHSunThur,
            "closeHSunThur": req.body.closeHSunThur,
            "openHFri": req.body.openHFri,
            "closeHFri": req.body.closeHFri,
            "openHSat": req.body.openHSat,
            "closeHSat": req.body.closeHSat,
            "contact_number": req.body.contact_number
        }

        let usernameCookie = req.cookies.username;

        // run query
        const Q3 = "INSERT INTO PLACES SET ?";
        connection.query(Q3, newPlace, (err, mysqlres) => {
            if (err) {
                console.log("error:", err);
                res.status(400).send({message: "error in creating place" + err});
                return;
            }
            console.log("created place:", {place_name: newPlace.place_name});

            res.cookie('username', usernameCookie, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
            res.render('ResultsPage', { 
                loggedInUser: usernameCookie,
                v1: "Thank for adding " + newPlace.place_name + " to our website!" 
            });
            return;

        });
    };




    // findPlaceByCity
    const findPlaceByCity = (req,res)=>{
        // validate body exists
        if (!req.body) {
            res.status(400).send({message: "please fill city to search"});
            return;
        }
        // pull data from body
        const city = req.query.city;

        let usernameCookie = req.cookies.username;

        // run query
        const Q4 = "SELECT * FROM PLACES WHERE city = ?";
        sql.query(Q4, city, (err, mysqlres)=>{
            if (err) {
                console.log("error: ", err);
                res.status(400).send({message:"could not search city"});
                return;
            }
            //if city not found 
            if (mysqlres.length == 0){
                console.log("error: city could not be found");
                res.render('ResultsPage', {
                    loggedInUser: usernameCookie,
                    v1: "We are very sorry, it seems like we do not have information about vegan friendly places in " + city, 
                })
                return;
            }
            console.log("found city: ", mysqlres);

            res.cookie('username', usernameCookie, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
            res.render('showAllPlaces', {
                loggedInUser: usernameCookie,
                v1: "Here are the restaursnts located in " + city,
                PLACES: mysqlres 
            })
            return;
        });
    };

    


    // insert new rate
    const createNewRate = (req, res) => {
        // validate request
        console.log("in create new rate");
        if (!req.body) {
            res.status(400).send({ message: "content can not be empty!" });
            return;
        }
        console.log("body is not empty")
        // insert input data from body into jason
        const newRate = {
            "place_name": req.body.place_name,
            "cleanliness": req.body.cleanliness,
            "FQuality": req.body.FQuality,
            "SQuality": req.body.SQuality,
            "VForMoney": req.body.VForMoney,
            "review": req.body.review
        }

        let usernameCookie = req.cookies.username;

        // run query
        const Q5 = "INSERT INTO RATES SET ?";
        connection.query(Q5, newRate, (err, mysqlres) => {
            if (err) {
                console.log("error:", err);
                res.status(400).send({message: "error in creating rate" + err});
                return;
            }
            console.log("created rate for:", {place_name: newRate.place_name});

            res.cookie('username', usernameCookie, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
            res.render('ResultsPage', {
                loggedInUser: usernameCookie,
                v1: "Thank you for adding a rate for " + newRate.place_name
            })
            return;

        });
    };

    

    // update password for registered user
    const updatePassword = (req, res) => {
        // Check if body is empty
        if (!req.body) {
            res.status(400).send({message: "Please fill in the required fields"});
            return;
        }
        
        const updateUser = {
            "username": req.body.username,
            "lastPassword": req.body.password,
            "newPassword": req.body.newPassword,
            "password_repeat": req.body.password_repeat
        };
        console.log(updateUser);
    
        let usernameCookie = req.cookies.username;
        
        // Check if current password matches the password in the database
        const Q6 = 'SELECT password FROM USERS WHERE username = ?';
        sql.query(Q6, [updateUser.username], (err, mysqlres) => {
            if (err) {
                console.log("error: " + err);
                res.render('ResultsPage', {
                    loggedInUser: usernameCookie,
                    v1: err
                });
                return;
            }
        
            console.log(mysqlres);
            if (mysqlres.length === 0) {
                res.render('ResultsPage', {
                    loggedInUser: usernameCookie,
                    v1: "User can not be found"
                });
                return;
            }
            
            // Check if the last password matches to the current password
            const storedPassword = mysqlres[0].password;
            if (updateUser.lastPassword !== storedPassword){
                res.render('ResultsPage', {
                    loggedInUser: usernameCookie,
                    v1: "The password you entered does not match the current password"
                });
                return;
            }
            
            res.cookie('password', storedPassword, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
            console.log(storedPassword);
            
            // Check if new password is not null
            if (!updateUser.newPassword) {
                res.render('ResultsPage', {
                    loggedInUser: usernameCookie,
                    v1: "New password cannot be empty"
                });
                return;
            }
    
            // check if passwords match
            if (updateUser.newPassword !== updateUser.password_repeat) {
                res.render('ResultsPage', {
                    loggedInUser: usernameCookie,
                    v1: "New password and repeat password do not match"
                });
                return;
            }

             // check if last password and new password are the same
            if (updateUser.lastPassword == updateUser.newPassword) {
                res.render('ResultsPage', {
                    loggedInUser: usernameCookie,
                    v1: "Last password and new password are the same, please choose a new password"
                });
                return;
            }
            
            
            const Q7 = 'UPDATE USERS SET password = ? WHERE username = ?';
            sql.query(Q7, [updateUser.newPassword, updateUser.username], (err, mysqlres) => {
                if (err) {
                    console.log("Error: " + err);
                    res.render('ResultsPage', {
                        loggedInUser: usernameCookie,
                        v1: err
                    });
                    return;
                }
                res.clearCookie('password');
                res.cookie('username', usernameCookie, { httpOnly: true, secure: true, maxAge: 1000 * 60 * 60 * 24 * 7 });
                res.render('ResultsPage', {
                    loggedInUser: usernameCookie,
                    v1: "Hi " + usernameCookie + " your password was updated successfully",
                })
                return;
            });
        });
    
    };


    
    // delete user
    const deleteUser = (req, res) => {
        // check if body is empty
        if (!req.body) {
            res.render('ResultsPage', {
                loggedInUser: usernameCookie,
                v1: "please fill username to search",
            });
    
            return;
        }
        
        let usernameCookie = req.cookies.username;
        
        // Check if user with the given username exists in the database
        const Q7 = 'SELECT * FROM USERS WHERE username = ?';
        sql.query(Q7, [usernameCookie], (err, mysqlres) => {
            if (err) {
                res.render('ResultsPage', {
                    loggedInUser: usernameCookie,
                    v1: "Error checking for user",
                });
                return;
            }
    
            if (!mysqlres.length) {
                res.render('ResultsPage', {
                    loggedInUser: usernameCookie,
                    v1: "User not found",
                });
    
                return;
            }

    
            // If the user exists, delete it
            const Q8 = 'DELETE FROM USERS WHERE username = ?';
            sql.query(Q8, [usernameCookie], (err, mysqlres) => {
                if (err) {
                    res.render('ResultsPage', {
                        loggedInUser: usernameCookie,
                        v1: "Error deleting user",
                    });
                    return;
                }
                
                res.render('ResultsPage', {
                    v1: `User deleted successfully with username: ${usernameCookie}`,
                });
    
            });
        });
    }
    
    

       








    module.exports = {createNewUser, findUser, createNewPlace, findPlaceByCity, createNewRate,
        updatePassword, deleteUser};
