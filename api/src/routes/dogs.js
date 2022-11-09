const { Router } = require('express')
const router = Router()
const { getDogs} = require('../controllers/dogs/getDogs')
// let { allDogs} = require('../controllers/dogs/getDogs')
const { getDogQuery } = require('../controllers/dogs/getDogPerQuery')
const { createDog } = require('../controllers/dogs/createDog')
const {deleteDog} = require('../controllers/dogs/deleteDog')

router.get('/', async (req,res) => {
    try {
        const {name} = req.query;
        if(!name) {
            res.status(200).send( await getDogs() )
        } else {
            console.log(name.toLowerCase())
            res.status(200).send(await getDogQuery(name.replace(/\s/g,'').toLowerCase()))
        }
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const allDogs = await getDogs()
        const dogId = allDogs.find(dog => dog.id == id)
        if(!dogId) {throw new Error("Does not exist")}
        res.status(200).send(dogId)
    } catch (error) {
        res.status(404).send(error.message)
    }
})

router.post('/', async (req,res) => {
    try {   
        res.status(201).send(await createDog(req.body))
    } catch (error) {
        console.log(error)
        if(error.message === 'It already exists'){
            res.status(409).send({msg:error.message,created:false})
        } else {
            console.log(error.message)
            res.status(422).send({msg:error.message,created:false})
        }
    }
})

router.delete('/:id',async (req,res) => {
    try {
        res.status(200).send(await deleteDog(req.params.id))
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router;