const router = require("express").Router();
const Stage = require('../models/stages')
const bodyparser = require("body-parser");
const urlencodedparser = bodyparser.urlencoded({extended:false});

router.get('/',(req,res)=>{
    res.render('team_home')
})

router.get('/datamine',(req,res)=>{
    Stage.find().count().then((val)=>{
        res.render("datamine",{data:val})
    }) 
})

router.get('/dashboard',(req,res)=>{
	res.render('team_dashboard');
})

router.post('/datamine',urlencodedparser,(req,res)=>{
    var data = req.body
	if(!data.name || !data.desc || !data.routes || !data.latitude){
		res.render('fail');
	}else{
		var location=[];
		var options=[];
		var sides;
		var routes = data.routes.split(',');
		var nearby = data.nearby.split(',');
		if(data.van){
			options.push('van');
		}
		if(data.bus){
			options.push('bus');
		}
		if(data.single){
			sides= 'single'
		}
		if(data.both){
			sides = 'both'
		}
		location.push(Number(data.latitude))
        location.push(Number(data.longitude))
        
        var result = new Stage({
            name:data.name,
            location:location,
            sides:data.sides,
            routes:data.routes,
            options:options,
            desc:data.desc,
            nearby:data.nearby,
          }).save().then(()=>{
              console.log(data.name," added to db.")
          }).catch(err=>{
              console.log(err);
          })
		res.render('success',{data:req.body})
    }
})

module.exports = router