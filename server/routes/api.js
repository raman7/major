const express = require('express');
const mongoose  = require('mongoose');
const User = require('../models/User');
const Faculty= require('../models/Faculty');
const Admin=require('../models/Admin');
const Marks=require('../models/Marks');
const Question = require('../models/Question');
var compile_run=require('compile-run');
const fs = require('fs');
const path = require('path');

const directory = 'code/python';



const router = express.Router();

const db = "mongodb://localhost"; 

mongoose.Promise = global.Promise;

    mongoose.connect(db,(err)=>{
            if(err){
                console.log("error "+err);
            }
            
            else
            {
                console.log("connected to mongoose successfully at 3000");
            }

    });


const app = express();


router.post('/getAnsweredQuestions',function(req,res){
    console.log(req.body.username);
    Marks.find({username:req.body.username})
    .exec(function(err,questions){
        if(err)
        console.log("error retrieving questions"+err);
        else{
            console.log(questions);
            return res.json(questions);
        }
    });
    

});



router.post('/getQuestions',function(req,res){

   Question.find({week:req.body.week,year:req.body.year,section:req.body.section})
   .exec(function(err,questions){
    if(err)
    console.log("error retrieving questions "+err);
    else{
        // console.log(questions);
        return res.json(questions);
    }
   });
});


    router.post('/postQuestion',function(req,res){
        console.log('posting a question');

        Question.findOne({name:req.body.name},function(err,question){
            if(err) 
            { 
                console.log(err);
                return {msg:"error"};
            }
            if(!question){
                console.log(question);
            var newQuestion = new Question();
            newQuestion.name=req.body.name;
            newQuestion.question=req.body.question;
            newQuestion.week = req.body.week;
            newQuestion.year=req.body.year;
            newQuestion.input=req.body.input;
            newQuestion.section=req.body.section;
            newQuestion.output=req.body.output;
            newQuestion.postedBy=req.body.postedBy;
            newQuestion.save(function(err,insertedQuestion){
                if(err){
                    console.log('error saving Question');
                    res.json({'msg':'Failed to post question'});
                }
                else{
                    console.log("posted successfully");
                res.json({'msg':'Question Posted Successfully'}); 
                
                }
            })
          }
          else{
          res.json({msg:'Question already exists',result:0});
          }
            
        });


    })

    

    router.post('/registerUser',function(req,res){
        console.log("Register a user");
      
        var newUser=new User();
        newUser.username=req.body.username;
        newUser.password=req.body.password;
        newUser.secretKey=req.body.secretKey;
        newUser.year = req.body.year;
        newUser.section=req.body.section;
        newUser.marks = 0;
        
        User.find({username:newUser.username},function(err,users){
            if(users.length){
                console.log("User already exists");
                     res.json({'msg':'User already exists'});
            }
            else{
                newUser.save(function(err,insertedUser){
                    if(err){
                        console.log("error Saving user "+err);
                        res.json({'msg':'Registration unsuccessful'});
                    }
                    else{
                        console.log("Registration successful");
                        res.json({'msg':'Registration Successful'});
                    }
        
                })
            }
   
    });
})  

    router.post('/studentLogin',function(req,res){
       console.log("student login......");
       var response={}
     User.findOne({username:req.body.username,password:req.body.password},function(err,user){
            if(err) 
            { 
                console.log(err);
                return {msg:"error"};
            }
            if(!user){
                console.log("invalid user");
                res.json({msg:"Invalid User",result:0});
          }
          else{
          console.log("Valid User");
          res.json({msg:'Login successful',result:1,userDetails:user});
          }
            
        });
    });


    router.post('/facultyLogin',function(req,res){
        console.log("Faculty login......");
        
      Faculty.findOne({username:req.body.username,password:req.body.password},function(err,user){
             if(err) 
             { 
                 console.log(err);
                 return {msg:"error"};
             }
            //  console.log(req.body.username);
             
             if(!user){
                 console.log("invalid user");
                 res.json({'msg':'Invalid User','result':0});
           }
           else{
           console.log("Valid User");
           res.json({'msg':'Login successful','value':user,'result':1});
           }
             
         });
     });
 
     router.post('/facRegister',function(req,res){

        Faculty.findOne({username:req.body.username},function(err,user){
            if(err) 
            { 
                console.log(err);
                return {msg:"error"};
            }
            if(user){
                console.log("User Already Exists");
                res.json({'msg':'User Already Exists','result':0});
            
          }
          else{
          console.log("Reistering user...");
          
          var newFaculty=new Faculty();
          newFaculty.username=req.body.username;
          newFaculty.password=req.body.password;
          newFaculty.sections=[];
          newFaculty.save(function(err,insertedFaculty){
              if(err)
              throw err;
              else
              res.json({'msg':'Login successful ','value':insertedFaculty,'result':1});
            })
          } 
        });
     });

     router.post('/compile',function(req,res){
        var code=req.body.code;
        var lang=req.body.lang;
        var input=req.body.input;
        var inp=input[0];
       
        compile_run.runPython(code, inp, function (stdout, stderr, err) {
           if(!err){
            fs.readdir(directory, (err, files) => {
                if (err) {
                    console.log("error files"+err);
                }
                else{
              
                for (const file of files) {
                  fs.unlink(path.join(directory, file), err => {
                    if (err){
                    console.log(err);      
                    }  
                  });
                }
            }
              });
                    if(stderr)
                    res.json(stderr);
                    else
                    res.json(stdout);
            }
            else{
            console.log(err);
            res.json(err);
            }
        });
    });


    



  
    router.post('/run',function(req,res){
     

        var code=req.body.code;
        var lang=req.body.lang;
        var input=req.body.input;
        var result=[];
        switch(lang){
            case 1:

            calculate(code,input)
            .then(result => {
                fs.readdir(directory, (err, files) => {
                    if (err) {
                        console.log("error files"+err);
                    }
                    else{
                  
                    for (const file of files) {
                      fs.unlink(path.join(directory, file), err => {
                        if (err){
                        console.log(err);      
                        }  
                      });
                    }
                }
                  });
                  console.log(result);
                res.json(result);
            })
            .catch(err => console.log("Error : "+err))
          
               
        } 
        
     });

     function calculate(code,input){
        var promiseArray = input.map(inp => {
            return new Promise((resolve, reject) => {
                compile_run.runPython(code, inp, function (stdout, stderr, err) {
                    if(!err){
                        if(stderr)
                        resolve(stderr);
                        else
                        resolve(stdout);
                    }
                    else{
                       
                        reject(err)
                    }
                })
            })
        })
        return Promise.all(promiseArray)
    }

     

    
     router.post('/saveMarks',function(req,res){
         console.log("saving marks");
        let studentMarks = new Marks();
        studentMarks.username=req.body.username;
        studentMarks.year=req.body.year;
        studentMarks.section=req.body.section;
        studentMarks.week = req.body.week;
        studentMarks.marks=req.body.marks;
        console.log(studentMarks);

        //user already..marks array push..
        Marks.findOneAndUpdate({username:req.body.username},{$push:{marks:studentMarks.marks[0]}},{new:true},(err,updatedMarks)=>{
            if(err)
                res.send("ERROR UPDATING Marks");
            else{
                    if(updatedMarks==null){
                        studentMarks.save((err,student)=>{
                            if(err)
                                    res.send("ERROR UPDATING Marks");
                            else{
                                    updateMarksInUserTable(req.body.username,req.body.marks[0].marksScored);
                                    return res.json({'msg':'submitted successfully','marks':student});
                                }
                        });
                    }else{
                        updateMarksInUserTable(req.body.username,req.body.marks[0].marksScored);
                        return res.json({'msg':'submitted successfully','marks':updatedMarks});
                    }
                }
            }
        );

    });

     let updateMarksInUserTable = (username,marksScored)=>{
        
        User.findOne({username:username},function(err,user){
            if(err) 
            { 
                console.log(err);
                return {msg:"error"};
            }
            if(!user){
                console.log("invalid user");
                res.json({msg:"Invalid User",result:0});
            }
            else{
                console.log("Valid User");
                console.log("usermakes : ",user.marks);
                console.log("reqbodymarks: ",marksScored);
                let updatedMarks = user.marks + parseInt(marksScored);
                console.log("user : ",user);

                User.findOneAndUpdate({username:username},{$set:{marks:updatedMarks}},{new:true},(err,updatedMarks)=>{
                    if(err)
                        console.log("error while updating marks"+err);
                    else
                        console.log("marks updated succesfully");
                }
            )};
        });
    }

    router.post('/submit',function(req,res){
        console.log("update marks");
        var username=req.body.userName;
        var marks=req.body.marks;
        Marks.findOneAndUpdate({username},
        {
            $set:{marks:marks}
        },
            {new:true},
                function(err,updatedMarks){
                    if(err)
                    res.send("ERROR UPDATING Marks");
                    else
                    return res.json({'msg':'submitted successfully','marks':updatedMarks});
            }
        );
    });


    router.post('/getMarks',function(req,res){
        var year=req.body.year;
        // var week=req.body.week;
        var section=req.body.section;
        User.find({year,section})
        .exec(function(err,records){
            if(err)
            console.log("error retrieving records"+err);
            else
            res.json(records);
        });
    });

    
    router.post('/getStudentMarks',function(req,res){
        var username=req.body.userName;
        Marks.findOne({username})
        .exec(function(err,records){
            if(err)
            console.log("error retrieving records"+err);
            else{
                // console.log(records)
                res.json(records);
            }


        });
    });

    

// router.post('/assignSection',function(req,res){
// var facUserName=req.body.username;
// var facSections=req.body.sections;
// Faculty.findOneAndUpdate({username: facUserName}, {$set:{sections:facSections}}, {new: true}, function(err, doc){
//     if(err){
//         console.log("Something wrong when updating data!");
//     }

//     // console.log(doc);
//     res.json(doc);
// }); 
// });

router.post('/adminRegister',function(req,res){
    var newAdmin=new Admin();
    newAdmin.username="admin";
    newAdmin.password="admin";
    newAdmin.save(function(err,details){
        if(err)
        res.json({'msg':'Registration Failed'});
        else{
            res.json({'msg':'Registration Successful'});
        }
    })
});

router.get('/getfaculty', (req, res) => {
    Faculty.find((err, faculty) => {
        res.send(faculty);
    })
})

router.post('/assignSection', function (req, res) {
  console.log("bjbasbkasny");
  var facUserName = req.body.name;

  Faculty.findOneAndUpdate({
    username: facUserName
  }, {
    $addToSet: {
      map:req.body.map
    }
  }, {
    new: true
  }, function (err, doc) {
    if (err) {
      console.log("Something wrong when mapping data!");
    }
    console.log(doc);
    res.json(doc);
  });
});

router.post('/adminLogin',function(req,res){

    Admin.findOne({username:req.body.username,password:req.body.password},function(err,user){
        if(err) 
        { 
            console.log(err);
            return {msg:"error"};
        }
        if(!user){
            // console.log("invalid user");
            res.json({msg:"Invalid User",result:0});
      }
      else{
    //   console.log("Valid User");
      res.json({msg:'Login successful',result:1,userDetails:user});
      }
        
    });
});

router.post('/deleteSection', function (req, res) {
    console.log(req.body)
    var facUserName = req.body.name;
  
  
    Faculty.findOneAndUpdate({
      username: facUserName
    }, {
      $pull: {
        map:{
           year:req.body.year,
           section:req.body.section
        }
      }
    }, {
      new: true
    }, function (err, doc) {
      if (err) {
        console.log("Something wrong when mapping data!");
      }
      console.log(doc);
      res.json(doc);
    });
  });





module.exports = router;
