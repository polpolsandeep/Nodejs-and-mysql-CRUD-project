const express=require("express");
const app=express();
const port=4003
const mysql=require("./connection").con

app.use(express.static(__dirname+"/public"))
app.set("view engine","hbs");
app.set("views","./view");

app.get('/',(req,res)=>{
res.render("index")
});
app.get('/add',(req,res)=>{
res.render("add")
});
app.get('/search',(req,res)=>{
res.render("search")
});
app.get('/update',(req,res)=>{
res.render("update")
});
app.get('/delete',(req,res)=>{
res.render("delete")
});
app.get('/view',(req,res)=>{
let qry="select*from test";
mysql.query(qry,(err,results)=>{
    if(err) throw err
    else{
        res.render("view",{data:results});
    }
});
});
app.get("/addstudent",(req,res)=>{
    const{name,phone,email,gender}=req.query
    //Sanitization
    let qry="select *from test where emailid=? or phoneno=?";
    mysql.query(qry,[email,phone],(err,results)=>{
        if(err)
         throw err
         else{
            if(results.length>0){
                res.render("add",{checkmesg:true})
        
            }else{
                //insert query
                let qry2="insert into test values(?,?,?,?)";
                mysql.query(qry2,[name,phone,email,gender],(err,results)=>{
                    if(results.affectedRows>0){
                        res.render("add",{msg:true})
                    }
                })
            }
         }
    })
});
app.get("/searchstudent",(req,res)=>{
    //fetch data from the form
    const{phone}=req.query;
    let qry="select * from test where phone no=?";
    mysql.query(qry,[phone],(err,results)=>{
        if(err) throw err
        else{
            if(results.length>0){
                res.render("search",{mesg1:true,mesg2:false})
            }else{
                res.render("search",{mesg1:false,mesg:true})
            }
        }
    });
})
app.get("/updatesearch",(req,res)=>{
    const{phone}=req.query;
    let qry="select * from test where phone no=?";
    mysql.query(qry,[phone],(err,results)=>{
        if(err) throw err
        else{
            if(results.length>0){
                res.render("search",{mesg1:true,mesg2:false,data:results})
            }else{
                res.render("search",{mesg1:false,mesg:true})
            }
        }
    });
})
app.get("/updatestudent",(req,res)=>{
    const{phone,name,gender}=req.query;
    let qry="update test set username=?,gender=?,where phoneno=?";
    mysql.qry(qry,[name,gender,phone],(err,results)=>{
        if(err) throw err
        else{
            if(results.affectedRows>0){
                res.render("update",{umesg:true})
            }

        }
    })
});
app.get("/removesstudent",(req,res)=>{
    const{phone}=req.query;
    let qry ="delete from test where phoneno=?";
    mqsql.query(qry[phone],(err,results)=>{
        if(err) throw err
        else{
            if(results.affectedRows>0){
                res.render("delete",{mesg1:true,mesg2:false})
            }else{
                res.render("delete",{mesg1:false,mesg:true})
            }
        }
    })
});
app.listen(port,(err)=>{
    if(err)
    throw err
    else
    console.log("server is running at port %d:",port);
})