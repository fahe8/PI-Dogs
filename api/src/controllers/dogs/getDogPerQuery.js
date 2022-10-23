const axios = require('axios')
const {Dog, Temperament} = require("../../db")
const { Op } = require("sequelize");
let {allDogs} = require('./getDogs')

const dogDb = async (dog) => {
    return await Dog.findAll({
        where: {
            name: { [Op.iLike]: `%${dog}%` }
        },
        include: {
            model: Temperament,
            attributes: ["name"],
            through: {attributes:[]}
        }
    });
}

const dogApi = async (dog) => {
    return allDogs.filter(f => f.name.toLowerCase().includes(dog)); 
}
const getDogQuery = async (dog) => {
    const queryApi = await dogApi(dog);
    const queryDb = await dogDb(dog);
    const res =  [...queryDb, ...queryApi]
    if(!res.length) {throw new Error('Not Found results')}
    return res;
}

module.exports = {getDogQuery};