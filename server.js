var express = require('express'); 
var bodyParser = require('body-parser');  
var path = require('path');  
var https = require('https');  
var http = require('http');  
var url = require('url');  
var nodemailer = require('nodemailer');
var ConversationV1 = require('watson-developer-cloud/conversation/v1');   

http.globalAgent.maxSockets=20;
var conversation = new ConversationV1({
  username: 'd80faae1-0929-4ea6-8b07-c9e5c74bdeed',
  password: 'pD3y2klbRfrq',
  version_date: ConversationV1.VERSION_DATE_2017_04_21
});

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: 'vatsal.eliot@gmail.com',
        pass: 'ztgw jlbj ytkt zonz'
    }
});

var app = express();

app.use(express.static(__dirname + '/public'));

app.use(bodyParser.urlencoded({
    extended: true,
    limit: '4mb',

}));

app.use(bodyParser.json());


app.get("/",function(req,res){
  res.sendFile(path.join(__dirname+'/public/index.html'));
});
app.get("/faculty",function(req,res){
  res.sendfile(path.join(__dirname+'/public/fac.html'));
});
app.get("/help",function(req,res){
  res.sendfile(path.join(__dirname+'/public/help.html'));
});
app.get("/home",function(req,res){
  res.sendfile(path.join(__dirname+'/public/home.html'));
});
app.engine('html', require('ejs').renderFile);
app.post("/chat",function(req,res){
  res.render(path.join(__dirname+'/public/help.html'),{data:req.body.data});
}); 

app.post("/help", function (req, res) {


    conversation.message({
      input: { text: req.body.message },
      workspace_id: '0344fedd-0d4e-4f18-bfa4-1a43c95d9148'
  }, function(err, response) {
     if (err) {
       res.send(err);
   } else {
       res.send(response.output.text);
   }
});
    // res.send(req.body.message);
    // res.send(req.body.message);
});
app.get("/computer",function(req,res){
  res.sendfile(path.join(__dirname+'/public/computer.html'));
});
app.get("/error",function(req,res){
    res.sendfile(path.join(__dirname+'/public/error.html'));
});
app.get("/teacher",function(req,res){
    res.sendfile(path.join(__dirname+'/public/teacher.html'));
});

app.get("/electrical",function(req,res){
    res.sendfile(path.join(__dirname+'/public/electrical.html'));
});
app.get("/mechanical",function(req,res){
    res.sendfile(path.join(__dirname+'/public/mechanical.html'));
});
app.get("/tform",function(req,res){
    res.sendfile(path.join(__dirname+'/public/tform.html'));
});
app.get("/tcancel",function(req,res){
    res.sendfile(path.join(__dirname+'/public/tcancel.html'));
});
app.get("/tupdate",function(req,res){
    res.sendfile(path.join(__dirname+'/public/tupdate.html'));
});
app.get("/emergency",function(req,res){
    res.sendfile(path.join(__dirname+'/public/emergency.html'));
});
app.get("/aneek",function(req,res){
    res.sendfile(path.join(__dirname+'/public/aneek.html'));
});
app.get("/driver",function(req,res){
    res.sendfile(path.join(__dirname+'/public/driver.html'));
});
app.get("/drivert",function(req,res){
    res.sendfile(path.join(__dirname+'/public/drivert.html'));
});
app.get("/cbooking",function(req,res){
    res.sendfile(path.join(__dirname+'/public/cbooking.html'));
});
app.get("/department",function(req,res){
    res.sendfile(path.join(__dirname+'/public/department.html'));
});
app.get("/timetables",function(req,res){
    res.sendfile(path.join(__dirname+'/public/timetables.html'));
});
app.get("/spbooking",function(req,res){
    res.sendfile(path.join(__dirname+'/public/Spbooking.html'));
});
app.get("/admin",function(req,res){

    res.sendfile(path.join(__dirname+'/public/admin.html'));
});
app.get("/mlab",function(req,res){
    res.redirect('https://mlab.com/login/');
});
app.get("/Esports",function(req,res){
    res.sendfile(path.join(__dirname+'/public/Sform.html'));
});
app.get("/Gform",function(req,res){
    res.sendfile(path.join(__dirname+'/public/Gform.html'));
});
app.get("/appointment",function(req,res){
    res.sendfile(path.join(__dirname+'/public/hospital.html'));
});
app.get("/hospi",function(req,res){
    res.sendfile(path.join(__dirname+'/public/hospi.html'));
});
app.set('view engine','ejs');
app.get("/students",function(req,res){
    var page = url.parse(req.url,true).query.page;
    if (page) {
        var MongoClient = require('mongodb').MongoClient
        , format = require('util').format;
        
        MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

            if (err) {
                res.end("Fault");
            } else {
                db.db('btp').collection(page).find().sort({roll : 1}).toArray(function(err, result) {
                    if (err) res.end("Fault");
                    else {
                        if (page == "Gymkhana")
                            res.render('gymkhana',{
                                title: 'Gymkhana',
                                students: result
                            });
                        else if (page == "PhD")
                            res.render('phd',{
                                title: 'PhD',
                                students: result
                            });
                        else
                            res.render('studentlist',{
                                title: page.replace("_"," "),
                                students: result
                            });
                    }
                });
            }
        });
    }
    else {
        res.sendfile(path.join(__dirname+'/public/student.html'));
    }
});
app.get("/timetable",function(req,res){
    var page = url.parse(req.url,true).query.page;
    if (page) {
        var MongoClient = require('mongodb').MongoClient
        , format = require('util').format;
        
        MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {
            if (err) {
                res.end("Fault");
            } else {
                db.db('btp').collection(page).find().sort({_id : 1}).toArray(function(err, result) {
                    if (err) res.end("Fault");
                    else {
                        res.render('timetable',{
                            title: page.replace("_"," "),
                            timetable: result
                        });
                    }
                });
            }
        });
    }
    else {
        res.sendfile(path.join(__dirname+'/public/student.html'));
    }
});

app.get("/doregister", function(req,res) {

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");

            throw err;
        } else {

          var name ="Arijit Mondal";
          var phd = "Nilotpal, Smita roy, Nilesh";
          var teaching = "CS241: Software Engineering, CS242: System Programming Laboratory";
          var research = "CAD for VLSI, Analog EDA.";
          var journal = "Improved Solution to the Non-Domination Level Update Problem- Sumit Mishra, Samrat Mondal and Sriparna Saha, Elsevier Applied Soft Computing, Vol: 60, pp: 336-362, 2017.";

          var abc = {"name":name,"phd":phd, "teaching":teaching,"research":research,"journal":journal};
          console.log("successfully connected to the database");
          console.log(abc);
          db.collection('faculty').insertOne(abc, function(err, result) {
            if(err) {
                console.log("Register failed!");
                res.end("Error");
                db.close();
                return;
            }
            res.end("Success");
            db.close();

        });


      }

  });
});
app.set('view engine','ejs');
app.get("/transport",function(req,res){

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
        } else {
            db.db('btp').collection('transport').find().sort({_id:-1}).toArray(function(err, result) {
                if (err) res.end("Fault");
                else {
                    res.render('transport',{
                        timing: result
                    });
                }
            });
        }
    });
    
});
app.get("/ahmad",function(req,res){

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
        } else {
            db.db('btp').collection('ahmad').find().sort({_id:-1}).toArray(function(err, result) {
                console.log("LOG");
                console.log(result);
                if (err) res.end("Fault");
                else {
                    res.render('fac',{
                        timing: result
                    });
                }
            });
        }
    });
    
});
app.get("/arijit",function(req,res){

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
        } else {
            db.db('btp').collection('arijit').find().sort({_id:-1}).toArray(function(err, result) {
                console.log("LOG");
                console.log(result);
                if (err) res.end("Fault");
                else {
                    res.render('fac',{
                        timing: result
                    });
                }
            });
        }
    });
    
});
app.get("/samrat",function(req,res){

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
        } else {
            db.db('btp').collection('samrat').find().sort({_id:-1}).toArray(function(err, result) {
                console.log("LOG");
                console.log(result);
                if (err) res.end("Fault");
                else {
                    res.render('fac',{
                        timing: result
                    });
                }
            });
        }
    });
    
});

app.get("/dschedule",function(req,res){

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
        } else {
            db.db('btp').collection('dschedule').find().sort({_id:-1}).toArray(function(err, result) {
                if (err) res.end("Fault");
                else {
                    res.render('dschedule',{
                        timing: result
                    });
                }
            });
        }
    });
    
});
app.get("/minventory",function(req,res){

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
        } else {
            db.db('btp').collection('minventory').find().sort({_id:-1}).toArray(function(err, result) {
                if (err) res.end("Fault");
                else {
                    res.render('minventory',{
                        timing: result
                    });
                }
            });
        }
    });
    
});
app.get("/vsports",function(req,res){

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
        } else {
            db.db('btp').collection('Sportsbooking').find().sort({_id:-1}).toArray(function(err, result) {
                if (err) res.end("Fault");
                else {
                    res.render('vsports',{
                        timing: result
                    });
                }
            });
        }
    });
    
});
app.get("/gview",function(req,res){

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
        } else {
            db.db('btp').collection('Groundbooking').find().sort({_id:-1}).toArray(function(err, result) {
                if (err) res.end("Fault");
                else {
                    res.render('gview',{
                        timing: result
                    });
                }
            });
        }
    });
    
});
app.get("/carbooking",function(req,res){

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
        } else {
            db.db('btp').collection('carbooking').find().sort({_id:-1}).toArray(function(err, result) {
                if (err) res.end("Fault");
                else {
                    res.render('tformview',{
                        timing: result
                    });
                }
            });
        }
    });
    
});
app.get("/formcancel",function(req,res){

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
        } else {
            var name = url.parse(req.url, true).query.name;
            var id = url.parse(req.url, true).query.id;
            var reason = url.parse(req.url, true).query.reason;
            console.log("successfully connected to the database");
            var query = { id : id, name:name};
            db.db('btp').collection("carbooking").findOne(query, function(err, obj) {
                if (err) throw err;
                else if(obj)
                {
                    res.end("aa");
                    
                }
                else{
                    res.end("errr")
                } 
            });
            db.db('btp').collection("carbooking").deleteOne(query, function(err, obj) {
                if (err) throw err;
                else{
                    console.log("1 document deleted");
                }
                res.end("aa");
                db.close();
            });
        }
    });
});
app.get("/formupdate",function(req,res){
    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
        } else {
            var email;
            var name = url.parse(req.url, true).query.name;
            var id = url.parse(req.url, true).query.id;
            var ocar = url.parse(req.url, true).query.ocar;
            var ncar = url.parse(req.url, true).query.ncar;
            var stime = url.parse(req.url, true).query.stime;
            var etime = url.parse(req.url, true).query.etime;
            var date = url.parse(req.url, true).query.date;
            console.log("successfully connected to the database");
            var query = { id : id, name:name,cart:ocar};
            var newvalues = { $set: {cart:ncar,stime:stime, etime:etime,date:date} };
            db.db('btp').collection("carbooking").findOne(query, function(err, obj) {
                if (err) throw err;
                else if(obj)
                {
                    email = obj.email;
                    console.log(email);
                    res.end("aa");

                    var mailOptions = {
                        from: 'iitp@gmail.com',
                        to: email,
                        subject: 'Car Booking updatation Confirmation',
                        text:'Dear '+name+',\n\n'+
                        'Thank you for booking a car with us.\n'+     
                        'Your car has been booked for '+date+' between '+stime+' and '+etime+'.\n'+
                        'Your id is '+id+' car is a '+ncar+' . The driver is '+'Sharukh Khan'+'.\n'+
                        '\nSafe Journey!\n\nThanking You,\nIITP Transportation Department'
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });
                    
                }
                else{
                    res.end("errr")
                } 
            });
            db.db('btp').collection("carbooking").updateOne(query,newvalues, function(err, obj) {
                if (err) throw err;
                else{
                   console.log("1 document updated");
               }
               db.close();
           });
        }
    });
});
app.get("/schedule",function(req,res){

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;

    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
        } else {
            db.db('btp').collection('schedule').find().sort({_id:1}).toArray(function(err, result) {
                if (err) res.end("Fault");
                else {
                    res.render('schedule',{
                        timing: result
                    });
                }
            });
        }
    });
    
});


app.get("/departed", function(req,res) {

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");

            throw err;
        } else {
          database=db.db('btp')
          // console.log(util.inspect(db, false, null))
          var bn = url.parse(req.url, true).query.bn;
          console.log(bn);
          var departedFrom = url.parse(req.url, true).query.source;
          var departedTime = url.parse(req.url,true).query.h + ":" + url.parse(req.url,true).query.m;
          var arrivalPlace = "-";
          var arrivedAt = "-";
          var recentplace = url.parse(req.url, true).query.source;

          var abc = {"BusN":bn,"DepartedFrom":departedFrom,"DepartureTime":departedTime, "ArrivalPlace":arrivalPlace,"ArrivalTime":arrivedAt,"RecentPlace":recentplace};
          console.log("successfully connected to the database");
          console.log(abc);
        // db.adminCommand({setFeat,ureCompatibilityVersion: "3.4.9"})
        database.collection('transport').insertOne(abc, function(err, result) {
            if(err) {
                console.log("Register failed!");
                res.end("Error");
                db.close();
                return;
            }
            res.end("Success");
            db.close();
        });


    }

});
});
app.get("/formval", function(req,res) {
    var flag = 0;
    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
            throw err;
        } else {
            database=db.db('btp')
        // console.log(util.inspect(db, false, null))
        var name = url.parse(req.url, true).query.name;
        var email = url.parse(req.url, true).query.email;
        var mob = url.parse(req.url, true).query.mob;
        var designation = url.parse(req.url, true).query.designation;
        var date = url.parse(req.url, true).query.date;
        var stime = url.parse(req.url, true).query.stime;
        var etime = url.parse(req.url, true).query.etime;
        var purpose = url.parse(req.url, true).query.purpose;
        var source = url.parse(req.url, true).query.source;
        var destination = url.parse(req.url, true).query.destination;
        var price = url.parse(req.url, true).query.price;
        var id = url.parse(req.url, true).query.id;
        var cart = url.parse(req.url, true).query.cart;
        var ac = url.parse(req.url, true).query.ac;
        //var id = url.parse(req.url, true).query.id;
        console.log("successfully connected to the database");
        var query = { date: date,cart : cart};
        database.collection("carbooking").find(query).toArray(function(err, result) {
            if (err) throw err;
            for(var i=0;i<result.length;++i)
            {    
                if((stime>=result[i].stime && stime<=result[i].etime) || (etime>=result[i].stime && etime<=result[i].etime))
                {
                    if (result[i].car == 1)
                        if (flag != 0) flag = 3; else flag = 1;

                    if (result[i].car == 2)
                        if (flag != 0) flag = 3; else flag = 2;
                }

            }
            if(flag==3)
            {
                res.end("error");
                console.log("cannot book car");
            }
            else 
            {
                if (flag == 1) var carn = 2; else carn = 1;

                var abc = {"ac":ac,"id":id,"cart":cart,"name":name,"email":email,"mob":mob,"designation":designation,"source":source,"destination":destination,"price":price,"date":date,"stime":stime,"etime":etime,"purpose":purpose,"car":carn};
                database.collection('carbooking').insertOne(abc, function(err, result) {
                    if(err) {
                        console.log("Register failed!");
                        res.end("Error");
                        db.close();
                        return;
                    }
                    console.log(abc);
                    carno = ['','WB08A2717','WB08A8733'];
                    if(cart=="Sedan")
                        driver = ['','Shahrukh Khan','Salman Khan'];
                    else if(cart=="Van")
                        driver = ['','Vivek Kr Shaw','Rohit Yadav'];
                    else if(cart=="Coupe")
                        driver = ['','Akshat Jain','Gagan Singh'];
                    else if(cart=="SUV")
                        driver = ['','Tejas Goyal','Anshuman Dwichedi'];
                    else if(cart=="Hatchback")
                        driver = ['','Rohan Pandey','Shivam Handa'];
                    var mailOptions = {
                        from: 'iitp@gmail.com',
                        to: email,
                        subject: 'Car Booking Confirmation',
                        text:'Dear '+name+',\n\n'+
                        'Thank you for booking a car with us.\n'+     
                        'Your car has been booked for '+date+' between '+stime+' and '+etime+'.\n'+
                        'Your id is '+id+' car is a '+cart+' (No: '+carno[carn]+'). The driver is '+driver[carn]+'.\n'+
                        '\nThe total cost of the journey amounts to Rs. '+price+'.\n'+
                        '\nSafe Journey!\n\nThanking You,\nIITP Transportation Department'
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                      if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                });

                    res.end("A car has been successfully booked for "+date+" between "+stime+" and "+etime+".\n"+
                        "A confirmation email has been sent to the given email id.");
                    db.close();
                });
            }
        });
    }
    
}); });
app.get("/otp", function(req,res) {
    var flag = 0;
    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
            throw err;
        } else {
            database=db.db('btp')
            var name = url.parse(req.url, true).query.name;
            var email = url.parse(req.url, true).query.email;
            var mob = url.parse(req.url, true).query.mob;
            var designation = url.parse(req.url, true).query.designation;
            var date = url.parse(req.url, true).query.date;
            var stime = url.parse(req.url, true).query.stime;
            var etime = url.parse(req.url, true).query.etime;
            var purpose = url.parse(req.url, true).query.purpose;
            var source = url.parse(req.url, true).query.source;
            var destination = url.parse(req.url, true).query.destination;
            var price = url.parse(req.url, true).query.price;
            var id = url.parse(req.url, true).query.id;
            var cart = url.parse(req.url, true).query.cart;
            var ac = url.parse(req.url, true).query.ac;
            var otp = url.parse(req.url, true).query.otp;
            var query = { date: date,cart : cart};
            database.collection("carbooking").find(query).toArray(function(err, result) {
                if (err) throw err;
                for(var i=0;i<result.length;++i)
                {    
                    if((stime>=result[i].stime && stime<=result[i].etime) || (etime>=result[i].stime && etime<=result[i].etime))
                    {
                        if (result[i].car == 1)
                            if (flag != 0) flag = 3; else flag = 1;

                        if (result[i].car == 2)
                            if (flag != 0) flag = 3; else flag = 2;
                    }

                }
                if(flag==3)
                {
                    res.end("error");
                }
                else 
                {
                    if (flag == 1) var carn = 2; else carn = 1;

                    var mailOptions = {
                        from: 'iitp@gmail.com',
                        to: email,
                        subject: 'Car Booking Confirmation OTP',
                        text:'Dear '+name+',\n\n'+
                        'Please confirm the journey by entering the given OTP on the webpage.\n'+
                        'The OTP is '+otp+' .\n' + 
                        'Thank you for booking a car with us.\n'+
                        '\nSafe Journey!\n\nThanking You,\nIITP Transportation Department'
                    };

                    transporter.sendMail(mailOptions, function(error, info){
                      if (error)
                      {
                        console.log(error);
                    }
                });

                    res.end("An OTP is sent to the given Email Id.");
                    db.close();

                }
            });
        }

    }); });
app.get("/Gbooking", function(req,res) {
    var flag = 0;
    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
            throw err;
        } else {
            database=db.db('btp')
            var name = url.parse(req.url, true).query.name;
            var email = url.parse(req.url, true).query.email;
            var mob = url.parse(req.url, true).query.mob;
            var designation = url.parse(req.url, true).query.designation;
            var date = url.parse(req.url, true).query.date;
            var roll = url.parse(req.url, true).query.roll;
            var ground = url.parse(req.url, true).query.ground;
            var etime = url.parse(req.url, true).query.etime;
            var stime = url.parse(req.url, true).query.stime;
            query ={ground:ground,date:date}
            database.collection("Groundbooking").find(query).toArray(function(err, result) {
                if (err) throw err;
                for(var i=0;i<result.length;++i)
                {    
                    if((stime>=result[i].stime && stime<=result[i].etime) || (etime>=result[i].stime && etime<=result[i].etime))
                    {
                        flag=30;
                    }

                }
                if(flag==30)
                {
                    res.end("error");
                }
                else 
                {
                    var abc = {"name":name,"email":email,"mob":mob,"designation":designation,"roll":roll,"date":date,"etime":etime,"stime":stime,"ground":ground};
                    database.collection('Groundbooking').insertOne(abc, function(err, result) {
                        if(err) {
                            res.end("Error");
                            db.close();
                            return;
                        }
                        var mailOptions = {
                            from: 'iitp@gmail.com',
                            to: email,
                            subject: 'Sports Ground Booking Confirmation',
                            text:'Dear '+name+',\n\n'+
                            'Thank you for booking the sports ground.\n'+     
                            'The Ground has been booked for '+date+'from'+stime+ ' to '+etime+'.\n'+
                            'Please maintain the ground and obey the rules and regulations.\n'+
                            '\nPlay Hard!!!\n\nThanking You,\nIITP Sports Department'
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                          if (error) {
                          } else {
                          }
                      });

                        res.end("The Required "+ground+" has been successfully booked for "+date+"form"+stime+ " to "+etime+".\n"+
                            "A confirmation email has been sent to the given email id.");
                        db.close();
                    });
                }
            });
        }

    }); });
app.get("/Sformval", function(req,res) {
    var flag = 0;
    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
            throw err;
        } else {
            database=db.db('btp')
            var name = url.parse(req.url, true).query.name;
            var email = url.parse(req.url, true).query.email;
            var mob = url.parse(req.url, true).query.mob;
            var designation = url.parse(req.url, true).query.designation;
            var issue_date = url.parse(req.url, true).query.issue_date;
            var roll = url.parse(req.url, true).query.roll;
            var equipment = url.parse(req.url, true).query.equipment;
            var return_date = url.parse(req.url, true).query.return_date;
            query ={equipment:equipment}
            database.collection("Sportsbooking").find(query).toArray(function(err, result) {
                if (err) throw err;
                for(var i=0;i<result.length;++i)
                {    
                    if((issue_date>=result[i].return_date && issue_date<=result[i].return_date) || (return_date>=result[i].issue_date && return_date<=result[i].return_date))
                    {
                        if (result[i].no == 1)
                            if (flag != 0) flag = 3; else flag = 1;

                        if (result[i].no == 2)
                            if (flag != 0) flag = 3; else flag = 3;
                    }

                }
                if(flag==3)
                {
                    res.end("error");
                }
                else 
                {
                    if (flag == 1) var no = 2; else no = 1;

                    var abc = {"name":name,"email":email,"mob":mob,"designation":designation,"roll":roll,"issue_date":issue_date,"return_date":return_date,"no":no,"equipment":equipment};
                    database.collection('Sportsbooking').insertOne(abc, function(err, result) {
                        if(err) {
                            res.end("Error");
                            db.close();
                            return;
                        }
                        var mailOptions = {
                            from: 'iitp@gmail.com',
                            to: email,
                            subject: 'Sports Equipment Booking Confirmation',
                            text:'Dear '+name+',\n\n'+
                            'Thank you for booking a sports equipment with us.\n'+     
                            'Your equipment has been booked for '+issue_date+' to '+return_date+'.\n'+
                            'Your equipment is a '+equipment+' (No: '+no+').\n'+
                            '\nPlay Hard!!!\n\nThanking You,\nIITP Sports Department'
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                          if (error) {
                            console.log(error);
                        } else {
                        }
                    });

                        res.end("The Required sports equipment has been successfully booked for "+issue_date+" to "+return_date+".\n"+
                            "A confirmation email has been sent to the given email id.");
                        db.close();
                    });
                }
            });
        }

    }); });
app.get("/checkavail", function(req,res) {
    var flag = 0;
    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
            throw err;
        } else {
            database=db.db('btp')
            var date = url.parse(req.url, true).query.date;
            var stime = url.parse(req.url, true).query.stime;
            var etime = url.parse(req.url, true).query.etime;
            var cart = url.parse(req.url, true).query.cart;
            var query = { date: date,cart : cart };
            database.collection("carbooking").find(query).toArray(function(err, result) {
                if (err) throw err;
                for(var i=0;i<result.length;++i)
                {    
                    if((stime>=result[i].stime && stime<=result[i].etime) || (etime>=result[i].stime && etime<=result[i].etime))
                    {
                        if (result[i].car == 1)
                            if (flag != 0) flag = 3; else flag = 1;

                        if (result[i].car == 2)
                            if (flag != 0) flag = 3; else flag = 2;
                    }

                }

                if(flag==3)
                {
                    res.end("error");
                }
                else 
                {
                    if (flag == 1) var carn = 2; else carn = 1;
                    res.end("Car Available");

                }

            });
        }

    }); 
});
app.get("/gcheckavail", function(req,res) {
    var flag = 0;
    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
            throw err;
        } else {
            database=db.db('btp')
            var date = url.parse(req.url, true).query.date;
            var stime = url.parse(req.url, true).query.stime;
            var etime = url.parse(req.url, true).query.etime;
            var ground = url.parse(req.url, true).query.ground;

            console.log("successfully connected to the database");
            var query = { date: date,ground : ground };
            database.collection("Groundbooking").find(query).toArray(function(err, result) {
                if (err) throw err;
                for(var i=0;i<result.length;++i)
                {    
                    if((stime>=result[i].stime && stime<=result[i].etime) || (etime>=result[i].stime && etime<=result[i].etime))
                    {
                        flag=30;
                    }

                }
                if(flag==30)
                {
                    res.end("error");
                }
                else 
                {
                    res.end("Car Available");
                }
            });
        }

    }); 
});
app.get("/Scheck", function(req,res) {
    var flag = 0;
    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
            throw err;
        } else {
            database=db.db('btp')
            var issue_date = url.parse(req.url, true).query.issue_date;
            var return_date = url.parse(req.url, true).query.return_date;
            var equipment = url.parse(req.url, true).query.equipment;
            var query = {equipment:equipment};
            database.collection("Sportsbooking").find(query).toArray(function(err, result) {
                if (err) throw err;
                for(var i=0;i<result.length;++i)
                {    
                 if((issue_date>=result[i].return_date && issue_date<=result[i].return_date) || (return_date>=result[i].issue_date && return_date<=result[i].return_date))
                 {
                    if (result[i].no == 1)
                        if (flag != 0) flag = 3; else flag = 1;

                    if (result[i].no == 2)
                        if (flag != 0) flag = 3; else flag = 3;
                }

            }

            if(flag==3)
            {
                res.end("error");
            }
            else 
            {
                res.end("equipment Available");

            }

        });
        }

    }); 
});
app.get("/arrived", function(req,res) {

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {



        if (err) throw err;
        var bn =  url.parse(req.url,true).query.bn;    
        var database = db.db('btp');
        var myquery = { ArrivalPlace: '-',ArrivalTime:"-",BusN:bn };
        var newvalues = { $set: { RecentPlace:"Ended",ArrivalPlace: url.parse(req.url,true).query.dest, ArrivalTime: url.parse(req.url,true).query.h + ":" + url.parse(req.url,true).query.m }};
        database.collection("transport").update(myquery, newvalues, {multi:true}, function(err, result) {
            if(err) {
                res.end("Error");
                db.close();
                return;
            }
            res.end("Success");
            db.close();
        });
    });

});


app.get("/nextarrival", function(req,res) {

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) throw err;
        var bn =  url.parse(req.url,true).query.bn;
        var database = db.db('btp');
        var myquery = { ArrivalPlace: '-',ArrivalTime:"-",BusN:bn};
        var newvalues = { $set: { RecentPlace: url.parse(req.url,true).query.RecentPlace}};
        database.collection("transport").update(myquery, newvalues, {multi:true}, function(err, result) {
            if(err) {
                res.end("Error");
                db.close();
                return;
            }
            res.end("Success");
            db.close();
        });

    });

});


app.post("/getdetails",function(req,res){
    var name = req.body.name;
    var data={
        'name':name,
    };

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");

            throw err;
        } else {
            db.collection('faculty').findOne({name: name}, function(err, document) {
                if(document == null) {
                    res.end("DoAgain");
                    return ;
                }
                if(document.name==name) {
                    data['teaching'] = document.teaching;
                    data['phd'] = document.phd;
                    data['research'] = document.research;
                    data['journal'] = document.journal;
                }
                res.end(JSON.stringify(data)); 
            });
        }
    });
});
app.get("/Rtransport", function(req,res) {

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) throw err;
        var database = db.db('btp');
        database.collection("transport").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK);
            res.end("done");
            db.close();
        });
    });
});   
app.get("/Rcarbooking", function(req,res) {

    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) throw err;
        var database = db.db('btp');
        database.collection("carbooking").drop(function(err, delOK) {
            if (err) throw err;
            if (delOK);
            res.end("done");
            db.close();

        });
    });
});

app.get("/appoint", function(req,res) {
    var flag = 0;
    var MongoClient = require('mongodb').MongoClient
    , format = require('util').format;
    MongoClient.connect('mongodb://vkmavi11:bittu420@ds163705.mlab.com:63705/btp', function (err, db) {

        if (err) {
            res.end("Fault");
            throw err;
        } else {
            database=db.db('btp')
            var name = url.parse(req.url, true).query.name;
            var email = url.parse(req.url, true).query.email;
            var mob = url.parse(req.url, true).query.mob;
            var designation = url.parse(req.url, true).query.designation;
            var date = url.parse(req.url, true).query.date;
            var roll = url.parse(req.url, true).query.roll;
            var doctor = url.parse(req.url, true).query.doctor;
            database.collection("appointments").find().toArray(function(err, result) {
                if (err) throw err;
                if(flag==30)
                {
                    res.end("error");
                }
                else 
                {
                    var abc = {"name":name,"email":email,"mob":mob,"designation":designation,"roll":roll,"date":date,"doctor":doctor};
                    database.collection('appointments').insertOne(abc, function(err, result) {
                        if(err) {
                            res.end("Error");
                            db.close();
                            return;
                        }
                        var mailOptions = {
                            from: 'iitp@gmail.com',
                            to: email,
                            subject: 'Ruban Appointment Confirmation',
                            text:'Dear '+name+',\n\n'+
                            'Thank you for booking an appointment.\n'+     
                            'The appointment has been booked for '+date+'.\n'+
                            'The timmings will be confirmed later by the hospital.\n'+
                            '\nstay healthy!!!\n\nThanking You,\nIITP Medical Department'
                        };

                        transporter.sendMail(mailOptions, function(error, info){
                          if (error) {
                          } else {
                          }
                      });

                        res.end("The appointment for required "+doctor+" has been successfully booked for "+date+". The timmings will be reported by the hospital later .\n"+
                            "A confirmation email has been sent to the given email id.");
                        db.close();
                    });
                }
            });
        }

    }); });
app.use(function(request,res,next){
    res.setHeader('Access-Control-Allow-Origin', "https://maps.googleapis.com/");

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});
app.listen(3000, function () { console.log('Example app listening on port 3000!'); });
