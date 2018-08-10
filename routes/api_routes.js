const router = require("express").Router();
const Stage = require("../models/stages.js")
var meta = require("../config/meta");

var res_meta = (meta,status,data)=>{
    if(!data){
        meta.status.code = 404
    }else{
    meta.status.code = status
    }
    if(status == 200){
        meta.status.message = "OK"
    }else if (status == 400){
        meta.status.message = "Bad Request"
    }else if (status == 401){
        meta.status.message = "Unauthorized"
    }else if (status == 403){
        meta.status.message = "Forbidden"
    }else if (status == 404){
        meta.status.message = "Not Found"
    }else if (status == 500){
        meta.status.message = "Internal server error"
    }else{
        meta.status.message = "error"
    }
    meta.response.data = data;
}

 router.get('/',(req,res)=>{
     res.json('reffer to documentation for API endpoints')
 })

router.get('/v1/stages/all',(req,res)=>{
   // let max_count = req.query.limit || 20;
    console.log(max_count)
    Stage.find().then((data)=>{
        let result = meta;
        res_meta(result,200,data);
        res.json(result);
    })
})

router.get('/v1/stages',(req,res)=>{
    let query = req.query;
    if(query.name){
        Stage.findOne({name:query.name}).then(data=>{
            if(data){
                let result = meta;
                res_meta(result,200,data);
                res.json(result);
            }else{
                let result = meta;
                res_meta(result,404,null);
                res.json(result);
            }
        }).catch(err=>{
            console.log("failed to fetch data",err)
        })
    }else if (query.nearby){
       Stage.find({nearby:query.nearby}).then(data=>{
           if(data.name){
            let result = meta;
            res_meta(result,200,data);
            res.json(result);
           }else{
            let result = meta;
            res_meta(result,404,null);
            res.json(result);
           }
       }).catch(err=>{
           console.log("failed to fetch data",err);
       })
    }else if(query.lat){
        let current_lat = Number(query.lat)
        let current_lon = Number(query.lon)

        let lat_upper = Number(current_lat.toFixed(4)) + 0.0001;
        let lat_lower = Number(current_lat.toFixed(4)) - 0.0001;
        let lon_upper = Number(current_lon.toFixed(4)) + 0.0001;
        let lon_lower = Number(current_lon.toFixed(4)) - 0.0001;
        Stage.find({
            $and:[
                {$and:[{location: {$gte:lon_lower}} , {location: {$lte:lon_upper} }]},
                {$and:[{location: {$gte:lat_lower}} , {location: {$lte:lat_upper} }]}
            ]
         }).then(data=>{
            if(data.name){
                let result = meta;
                res_meta(result,200,data);
                 res.json(result);
            }else{
                let result = meta;
                res_meta(result,404,null);
                res.json(result);
            }
        }).catch(err=>{
             console.log("failed to fetch data",err)
         })
    }
})


module.exports = router