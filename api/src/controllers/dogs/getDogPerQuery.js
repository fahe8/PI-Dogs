const axios = require('axios')
const {Dog, Temperament} = require("../../db")
const { Op } = require("sequelize");
let {allDogs,  getDogs} = require('./getDogs')

// const dogDb = async (dog) => {
//     return await Dog.findAll({
//         where: {
//             name: { [Op.iLike]: `%${dog}%` }
//         },
//         include: {
//             model: Temperament,
//             attributes: ["name"],
//             through: {attributes:[]}
//         }
//     });
// }

// const dogApi = async (dog) => {
//     const dogs = await getDogs()
//     return dogs.filter(f => f.name.toLowerCase().includes(dog)); 
// }
const getDogQuery = async (dog) => {
    const dogs = await getDogs()
    const res = dogs.filter(f => f.name.toLowerCase().includes(dog)); 
    if(!res.length) {throw new Error('Not Found results')}
    return res;
}

module.exports = {getDogQuery};