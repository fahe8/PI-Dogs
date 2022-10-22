const { Router } = require('express')
const router = Router()
const {getTemperaments} = require('../controllers/temperament/getTemperaments')

router.get('/', async (req,res) => {
    try {
        res.status(200).send(await getTemperaments())
    } catch (error) {
        res.status(404).send(error.message)
    }
})

module.exports = router