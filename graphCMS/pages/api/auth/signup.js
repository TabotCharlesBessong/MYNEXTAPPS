import connectMongo from "../../../database/connection"
import Users from "../../../model/Schema"
import {hash} from 'bcrypt'

export default async function handler(req, res, next) {
  connectMongo().catch(error => res.json({error:'Connection failed'}))

  // only post method is accepted
  if(req.method === 'POST'){
    if(!req.body) return res.status(404).json({error:'Does not have form data'})

    const {username,email,password} = req.body

    // check duplicate user
    const existing = await Users.findOne({email})
    if(existing) return res.status(422).json({message:"User already exist...!"})
    
    // hash password
    Users.create({username,email,password:await hash(password,12)},function(err,data){
      if(err) return res.status(404).json({err})
      res.status(201).json({status:true,user:data})
    })

  }else{
    res.status(500).json({message:'HTTP Method not valid , only post method accepted'})
  }
}