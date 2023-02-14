// import the necessity
const mysql = require("mysql2");
const DBconfig = require("./db.config");

// create a connection to the database using the configuration
const connection = mysql.createConnection({
    host: DBconfig.HOST,
    user: DBconfig.USER,
    password: DBconfig.PASSWORD,
    database: DBconfig.DB
});

// open the connection
connection.connect(error =>{
    if (error) throw error; 
    console.log("successefuly conected to DB");
    });

// export the connection
module.exports = connection;

