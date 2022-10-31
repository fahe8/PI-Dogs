const axios = require('axios')
const {Temperament } = require('../../db')
const {allDogs, getDogs} = require('../dogs/getDogs')
const getTemperaments = async () => {
    // const {data} = await  axios.get('https://api.thedogapi.com/v1/breeds')
    const dogs = await getDogs()
    const info = dogs?.map(dog => 
        dog.temperaments?.split(', ')
    ).flat()

    let temperamentFilters = [...new Set(info)].filter(f => f !== undefined)
    console.log(temperamentFilters)
    temperamentFilters.map( (t) => {
        Temperament.findOrCreate({
            where: {
                name: t
            }
        })
    })

    const allTemp = await Temperament.findAll({attributes:["name"]})

    return allTemp
}

module.exports = { getTemperaments }