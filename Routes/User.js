const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');
const mongoose = require('mongoose');
const jwt=require('jsonwebtoken');
const User = require('../Models/UserModel');
router.post('/register', async (req, res) => {
    const { email, nom, prenom, mdp } = req.body;
    if (!email || !nom || !prenom || !mdp) {
        return res.status(400).send('Tous les champs sont obligatoires');
    }
    // const existingUser =User.findOne({ email:email });
    // if (existingUser) {
    //     res.json(existingUser._id);
    // }
    const salt= await bcrypt.genSalt(10);
    const hashedPassword =await bcrypt.hash(mdp, salt);
    const newUser =new User({
        email:email,
        nom:nom,
        prenom:prenom,
        mdp: hashedPassword
    });
    try {
         newUser.save();
        res.status(201).json(newUser);
    } catch (err) {
        res.status(500).send('Erreur du serveur, veuillez réessayer plus tard');
    }
});
router.post('/login', async (req, res) => {
    const { email, mdp } = req.body;
    if (!email || !mdp) {
        return res.status(400).send('Tous les champs sont obligatoires');
    }
    const user=await User.findOne({ email:email });
    if (!user) {
        return res.status(404).send('Utilisateur non trouvé');
    }
    const validPassword=await bcrypt.compare(mdp, user.mdp);
    if (!validPassword) {
        return res.status(401).send('Mot de passe incorrect');
    }
    const token = jwt.sign({ _id: user._id, email: user.email }, 'alae_secret_key');
    res.status(200).send({ token });
});
router.get('/',async(req,res)=>{
    const users=await User.find();
    res.json(users);
})
module.exports = router;