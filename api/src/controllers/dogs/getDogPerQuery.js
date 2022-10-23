const axios = require('axios')
const {Dog, Temperament} = require("../../db")
const { Op } = require("sequelize");

const dogDb = async (dog) => {
    return await Dog.findAll({
        where: {
            name: { [Op.iLike]: `%${dog}%` }
        },
        include: {
            model: Temperament,
            attributes: ["name"]
        }
    })
}

const dogApi = async (dog) => {
    const {data} = await axios.get(`https://api.thedogapi.com/v1/breeds/search?q=${dog}`)
    if(data.length > 0) {
        const { id, name, image, weight , temperament } = data[0];
        return {
            id: id,
            name:name,
            image:image.url,
            weight: weight.metric,
            temperament: temperament?.split(', ')
        }
    } 
    return data

}
const getDogQuery = async (dog) => {
    const queryApi = await dogApi(dog)
    const queryDb = await dogDb(dog)
    return [...queryDb, ...queryApi]
}

module.exports = {getDogQuery}