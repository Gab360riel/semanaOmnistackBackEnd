const axios = require('axios')
const dev = require('../models/dev')

module.exports = {
    async index(req, res){
        const { user } = req.headers

        const loggedDev = await dev.findById(user);
        
        const users = await dev.find({
            $and:[
                {_id: { $ne: user }},
                {_id: { $nin: loggedDev.likes}},
                {_id: { $nin: loggedDev.dislikes }},
            ],
        })
        return  res.json(users);
    }, 

    async store(req, res){
        const { userName } = req.body;

        const userExists = await dev.findOne({user: userName});

        if (userExists) {
            return res.json(userExists)
        }

        const response = await axios.get(`https://api.github.com/users/${userName}`)

        const { name, bio, avatar_url: avatar} = response.data;

        const deev = await dev.create({ 
            name,
            user: userName,
            bio,
            avatar
         })

        return res.json(deev)
    }
}