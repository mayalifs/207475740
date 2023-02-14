const path = require('path');
const sql = require('./db');
const csv = require('csvtojson');

// creates all tables
const createAllTables = (req, res) => {
    createUsers(req, res);
    createPlaces(req, res);
    createRates(req, res);
  
    res.render('ResultsPage',{
        v1: "All tables created!"
    });
  };

// drops all tables
const dropAllTables = (req, res) => {
    dropUsersTable(req, res);
    dropPlacesTable(req, res);
    dropRatesTable(req, res);
  
    res.render('ResultsPage', {
        v1: "All tables dropped!"
    });
};


//  drop users table
const dropUsersTable = (req, res)=>{
    var Qd1 = "DROP TABLE USERS";
    sql.query(Qd1, (err, mysqlres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error in dropping table" + err});
            return;
        }
        console.log("users table drpped");
        return;
    })
}

//  drop places table
const dropPlacesTable = (req, res)=>{
    var Qd2 = "DROP TABLE PLACES";
    sql.query(Qd2, (err, mysqlres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "error in dropping table" + err});
            return;
        }
        console.log("palces table drpped");
        return;
    })
}

//  drop rates table
const dropRatesTable = (req, res)=>{
    var Qd3 = "DROP TABLE RATES";
    sql.query(Qd3, (err, mysqlres)=>{
        if (err) {
            console.log("error in droping table ", err);
            res.status(400).send({message: "errorin dropping table" + err});
            return;
        }
        console.log("rates table drpped");
        return;
    })
}

//  create users table
const createUsers = (req,res)=> {
    var Qc1 = `CREATE TABLE IF NOT EXISTS USERS (
        first_name VARCHAR(255) NOT NULL,
        last_name VARCHAR(255) NOT NULL,
        username VARCHAR(255),
        email VARCHAR(255) NOT NULL,
        password VARCHAR(255) NOT NULL,
        
        PRIMARY KEY (username, email)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

    sql.query(Qc1,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created table USERS');
        return;
    })      
}

//  create places table
const createPlaces = (req,res)=> {
    var Qc2 = `CREATE TABLE IF NOT EXISTS PLACES (
        place_name VARCHAR(255) NOT NULL PRIMARY KEY,
        street_name VARCHAR(255) NOT NULL,
        street_number VARCHAR(255) NOT NULL,
        city VARCHAR(255)NOT NULL,
        google_site VARCHAR(255) NOT NULL,
        openHSunThur TIME DEFAULT '00:00:00' NOT NULL,
        closeHSunThur TIME DEFAULT '00:00:00' NOT NULL,
        openHFri TIME DEFAULT '00:00:00' NOT NULL,
        closeHFri TIME DEFAULT '00:00:00' NOT NULL,
        openHSat TIME DEFAULT '00:00:00' NOT NULL,
        closeHSat TIME DEFAULT '00:00:00' NOT NULL,
        contact_number VARCHAR(15) NOT NULL
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

    sql.query(Qc2,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created table PLACES');
        return;
    })      
}

//  create rates table
const createRates = (req,res)=> {
    var Qc3 = `CREATE TABLE IF NOT EXISTS RATES (
        place_name VARCHAR(255) NOT NULL,
        cleanliness INT NOT NULL,
        FQuality INT NOT NULL,
        SQuality INT NOT NULL,
        VForMoney INT NOT NULL,
        review VARCHAR(255)
        ) ENGINE=InnoDB DEFAULT CHARSET=utf8;`;

    sql.query(Qc3,(err,mySQLres)=>{
        if (err) {
            console.log("error ", err);
            res.status(400).send({message: "error in creating table"});
            return;
        }
        console.log('created table RATES');
        return;
    })      
}

//  insert inro users table
const insertIntoUsers = (req,res)=>{
    var Qi1 = "INSERT INTO USERS SET ?";
    const csvFilePath = path.join(__dirname, "../content/USERS.csv");
    csv()
        .fromFile(csvFilePath)
        .then((jsonObj)=>{
            console.log(jsonObj);
            jsonObj.forEach(element => {
                var newUser = {
                    "first_name": element.first_name,
                    "last_name": element.last_name,
                    "username": element.username,
                    "email": element.email,
                    "password": element.password,
                }
                sql.query(Qi1, newUser, (err,mysqlres)=>{
                    if (err) {
                        console.log("error in inserting new user", err);
                    }
                });
                console.log("data inserted into USERS");
            });
        })
        res.render('ResultsPage',{
            v1: "Data was inserted into USERS table"
        });
};



    //  insert inro places table
    const insertIntoPlaces = (req,res)=>{
        var Qi2 = "INSERT INTO PLACES SET ?";
        const csvFilePath = path.join(__dirname, "../content/PLACES.csv");
        csv()
            .fromFile(csvFilePath)
            .then((jsonObj)=>{
                console.log(jsonObj);
                jsonObj.forEach(element => {
                    var newPLACE = {
                        "place_name": element.place_name,
                        "street_name": element.street_name,
                        "street_number": element.street_number,
                        "city": element.city,
                        "google_site": element.google_site,
                        "openHSunThur": element.openHSunThur,
                        "closeHSunThur": element.closeHSunThur,
                        "openHFri": element.openHFri,
                        "closeHFri": element.closeHFri,
                        "openHSat": element.openHSat,
                        "closeHSat": element.closeHSat,
                        "contact_number": element.contact_number
                    }
                    sql.query(Qi2, newPLACE, (err,mysqlres)=>{
                        if (err) {
                            console.log("error in inserting new place", err);
                        }
                    });
                    console.log("data inserted into PLACES");
                });
            })
            res.render('ResultsPage',{
                v1: "Data was inserted into PLACES table"
            });
    };


    //  insert inro rates table
    const insertIntoRates = (req,res)=>{
        var Qi3 = "INSERT INTO RATES SET ?";
        const csvFilePath = path.join(__dirname, "../content/RATES.csv");
        csv()
            .fromFile(csvFilePath)
            .then((jsonObj)=>{
                console.log(jsonObj);
                jsonObj.forEach(element => {    
                    var newRate = {
                        "place_name": element.place_name,
                        "cleanliness": element.cleanliness,
                        "FQuality": element.FQuality,
                        "SQuality": element.SQuality,
                        "VForMoney": element.VForMoney,
                        "review": element.review
                    }
                    sql.query(Qi3, newRate, (err,mysqlres)=>{
                        if (err) {
                            console.log("error in inserting new rate", err);
                        }
                    });
                    console.log("data inserted into RATES");
                });
            })
            res.render('ResultsPage',{
                v1: "Data was inserted into RATES table"
            });
    };

// show all users
const showAllUsers = (req,res)=>{
    var Qs1 = "SELECT * FROM USERS";
    sql.query(Qs1, (err, mysqlres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing USERS table");
        res.render('showAllUsers', {
            v1: "Here are all the users",
            USERS: mysqlres
        })
        return;
    })
};

// show all places
const showAllPlaces = (req,res)=>{
    var Qs2 = "SELECT * FROM PLACES";
    sql.query(Qs2, (err, mysqlres)=>{
        if (err) {
            console.log("error in showing table ", err);
            res.send("error in showing table ");
            return;
        }
        console.log("showing PLACES table");
        res.render('showAllPlaces', {
            v1: "Here are all the places",
            PLACES: mysqlres
        })
        return;
    })};

    // show all rates
    const showAllRates = (req,res)=>{
        var Qs3 = "SELECT * FROM RATES";
        sql.query(Qs3, (err, mysqlres)=>{
            if (err) {
                console.log("error in showing table ", err);
                res.send("error in showing table ");
                return;
            }
            console.log("showing RATES table");
            res.render('showAllRates', {
                v1: "Here are all the rates",
                RATES: mysqlres
            })
            return;
        })
    };
    



module.exports = {dropUsersTable, dropPlacesTable, dropRatesTable,
    createUsers, createPlaces, createRates,
    showAllUsers, showAllPlaces, showAllRates,
    insertIntoUsers, insertIntoPlaces, insertIntoRates
    ,createAllTables, dropAllTables};
