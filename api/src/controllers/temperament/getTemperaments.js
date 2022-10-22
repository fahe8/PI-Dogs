const axios = require('axios')
const {Temperament } = require('../../db')
const getTemperaments = async () => {
    const {data} = await  axios.get('https://api.thedogapi.com/v1/breeds')

    const info = data?.map(dog => 
        dog.temperament?.split(', ')
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