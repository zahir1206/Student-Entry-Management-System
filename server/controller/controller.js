var Userdb = require('../model/model');

//create and save new user
exports.create = (req,res) =>{

    //validate request
    if(!req.body){
        res.status(400).send({message:"content can not be empty"})
        return;
    }
    //new user
    const user = new Userdb({
        name:req.body.name,
        email:req.body.email,
        gender:req.body.gender,
        status:req.body.status
    })

    //save user in the data base
    user
        .save(user)
        .then(data =>{
           // res.send(data)
           res.redirect("/add-user")
        })
        .catch(err =>{
            res.status(500).send({
                message:err.message || "some error occurred while creating a create operation"
            })
        })
}

//retrieve and return all users/ and return single user
exports.find=(req,res)=>{
    if(req.query.id){
        const id = req.query.id;

        Userdb.findById(id)
          .then(data=>{
            if(!data){
                res.status(404).send({message:"not found user with id"+id})
            }else{
                res.send(data)
            }
          })
          .catch(err=>{
            res.status(500).send({message:"Error retrieving user with id" +id})
          })

    }else{

    Userdb.find()
    .then(user=>{
        res.send(user)

    })
    .catch(err=>{
        res.status(500).send({message:err.message || "error occured while retriving user information"})
    })

}
}

//update a new user idetifed user by userid
exports.update=(req,res)=>{ 
    if(!req.body){
        return res
           .status(400)
           .send({message:"data to update cannot be empty"})
        }
        const id=req.params.id;
        Userdb.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
        .then(data=>{
            if(!data){
                res.status(404).send({message:`Cannot Update user with ${id}.may be user not found`})
            }else{
                res.send(data)
            }
        })
        .catch(err=>{
            res.status(500).send({message:"Error Update information"})
        })

}

//delete a users with specified userid in the request

exports.delete=(req,res)=>{
    const id=req.params.id;
    Userdb.findByIdAndDelete(id)
    .then(data=>{
        if(data){
            res.status(404).send({message:`Cannot delete with id ${id}.may be id is wrong`})
        }else{
            req.send({
                message:"user was deleted successfully!"
            })
        }
    })
    .catch(err=>{
        res.status(500).send({
            message:"could not delete user with id =" +id
        })
    })

}

