const  Clarifai = require('clarifai');
const app = new Clarifai.App({
    apiKey: '7838c884ee4e4457a3a78ac36a5ab36c'
  });

const handleApiCall = (req,res)=>{
    app.models.predict('c0c0ac362b03416da06ab3fa36fb58e3', req.body.input)
        .then(data =>{res.json(data)})
        .catch(err=> res.status(400).json("unable to work with API"))
}


const handleImage = (req,res,db , bcrypt)=>{
    const {id}= req.body;
    db('users').where('id', '=', id)
    .increment('entries',1)
    .returning('entries')
    .then(entries=>{
        if(entries.length){
            res.json(entries[0])
        }
        else{
            res.json('not a correct id')
        }
        
    })
    .catch(err=>{
        res.status(400).json("Unable to get entries")
    })
}

module.exports={
    handleImage: handleImage,
    handleApiCall: handleApiCall
}