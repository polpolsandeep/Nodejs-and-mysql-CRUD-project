const mysql=require("mysql")
const con=mysql.createConnection({
    host:"localhost",
    user:"root",
    password:"",
    database:"crud",
    port:3308
});
con.connect((err)=>{
    if (err) throw err;
    console.log("Connetion Created....!!");
});
module.exports.con=con;
