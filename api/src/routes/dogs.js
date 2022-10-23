const { Router } = require('express')
const router = Router()
const { getDogs} = require('../controllers/dogs/getDogs')
let { allDogs} = require('../controllers/dogs/getDogs')
const { getDogQuery } = require('../controllers/dogs/getDogPerQuery')
const { createDog } = require('../controllers/dogs/createDog')

router.get('/', async (req,res) => {
    try {
        console.log(req.query)
        const {name} = req.query;
        if(!name) {
            res.status(200).send( await getDogs() )
        } else {
            res.status(200).send(await getDogQuery(name))
        }

    } catch (error) {
        res.send(error.message)
    }
})

router.get('/:id', async (req,res) => {
    try {
        const {id} = req.params
        const dogId = allDogs.find(dog => dog.id == id)
        res.status(200).send(dogId)
    } catch (error) {
        
    }
})

router.post('/', async (req,res) => {
    try {   
        res.status(200).send(await createDog(req.body))
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router;