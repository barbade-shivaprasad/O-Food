var express = require('express');
var router = express.Router();
const fs = require('fs');

const mydata = JSON.parse(fs.readFileSync('./routes/details.json' , 'utf-8'));


/* GET home page. */
router.get('/', function(req, res, next) {
  res.send();
});

router.post('/signup' , function(req , res){

  let flag = 0 ,flag1 = 0;
    mydata.data.forEach(element => {
        if(element.email == req.body.email){

          flag = 1;
        }
    });

    if(flag == 1)
    res.send({message : "Already have an account"});
    else
    {
      res.status(200).send({message : ""});

      if(req.body.change == "1"){

        delete req.body['change'];
        mydata.data.unshift(req.body);
        fs.writeFileSync('./routes/details.json',JSON.stringify(mydata));

      }

    }
})

let details = {};

router.post('/login' , function(req ,res){

    let flag = 0;
    mydata.data.forEach(element => {

        if(element.email == req.body.email && element.password == req.body.password){

            flag = 1;
            details.name = element.name;
            details.email = req.body.email;
            details.phone = element.phone;
            
            
        }
    });

    if(flag == 1)
    res.send({message : "" , info : details });
    else
    res.send({message : "Please Check Your emial or Password"})

})
module.exports = router;
