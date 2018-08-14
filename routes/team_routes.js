const router = require("express").Router();
const Stage = require('../models/stages')
const TeamMember = require('../models/team_member');
const bodyparser = require("body-parser");
const urlencodedparser = bodyparser.urlencoded({extended:false});

const authCheck = (req,res,next)=>{
	if(!(req.user)){
		res.redirect('/team')
	}else{
		next();
	}
}

router.get('/',(req,res)=>{
    res.render('team_home')
})

router.get('/test',authCheck,(req,res)=>{
	res.render('test');
})

router.get('/datamine',authCheck,(req,res)=>{
    Stage.find().count().then((val)=>{
        res.render("datamine",{data:val})
    }) 
})

router.get('/dashboard',authCheck,(req,res)=>{
		res.render('team_dashboard',{data:req.user});
})

router.get('/teammembers',authCheck,(req,res)=>{
	TeamMember.find({}).then(data=>{
		res.json(data);
	})
})

router.post('/datamine',authCheck,urlencodedparser,(req,res)=>{
    let data = req.body
	if(!data.name || !data.desc || !data.routes || !data.latitude){
		res.render('fail');
	}else{
		let location=[];
		let options=[];
		let routes = data.routes.split(',');
		let nearby = data.nearby.split(',');
		if(data.van){
			options.push('van');
		}
		if(data.bus){
			options.push('bus');
		}
		location.push(Number(data.latitude))
        location.push(Number(data.longitude))
        
         new Stage({
            name:data.name,
            location:location,
            routes:routes,
            options:options,
            desc:data.desc,
            nearby:nearby,
          }).save().then(()=>{
              console.log(data.name," added to db.")
          }).catch(err=>{
              console.log(err);
          })
		res.render('success',{data:req.body})
    }
})

module.exports = router


