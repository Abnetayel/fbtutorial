const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const app = express();
const users =JSON.parse(fs.readFileSync(`${__dirname}/../data/users.json`,'utf-8'))
const getAllUsers = (req, res) => {
    req.requestTime = new Date().toISOString();
    console.log(`request time is ${req.requestTime}`);
    try {
        res.status(200).json({
            status: "success",
            results: users.length,
            time: req.requestTime,
            data: {
                users
            }
        });
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
};
const getspecificuser=(req,res)=>{
    const id=req.params.id*1;
const user=users.find(el=>el.id===id);
     if(!user){
        return res.status(404).json({
            status:'fail',
            message:'invalid id',
            data:null
        })
     }
res.json({
    status:'success',
    data:{
        user
    }
})
}
const postuser=(req,res)=>{
    try{
        const user=users[users.length=1].id+1;
        const newuser={id:user,...req.body};
        users.push(newuser)
        fs.writeFile(`${__dirname}/../data/users.json`,JSON.stringify(users),(err)=>{
            if(err) throw err;
            res.status(201).json({
                status:'success',
                data:{user:newuser}
            })
        })
    }
    catch(error){
        res.status(500).json({
            status:'erorr',
            message:'server error'
        })
    }
}
const patchuser=(req,res)=>{
    const id=req.params.id*1;
    const user=users.find(el=>el.id===id);
    if(!user){
        return res.status(404).json({
            status:'fail',
            message:'invalid id',
            data:null
        })
    }
    Object.assign(user,req.body)
    fs.writeFile(`${__dirname}/../data/users.json`,JSON.stringify(users),(err)=>{
        if(err) throw err;
        res.status(200).json({
            status:'success',
            data:{
                user
            }
        })
    
    }) 
}
const deleteuser = (req,res)=>{
    const id = req.params.id*1
    const userindex = users.findIndex(el=>el.id===id);
    if(userindex===-1){
        return res.status(404).json({
            status:'fail',
            message:'invalid id',
            data:null
        })
    }
    users.splice(userindex,1);
    fs.writeFile(`${__dirname}/../data/users.json`,JSON.stringify(users),(err)=>{
        if(err) throw err;
        res.status(204).json({
            status:'success',
            message:'user deleted',
        })
    })
}
const userRouter = express.Router();
userRouter.route('/')
.get(getAllUsers)
.post(postuser)

userRouter.route('/:id')
.get(getspecificuser)
.patch(patchuser)
.delete(deleteuser)
 module.exports=userRouter;