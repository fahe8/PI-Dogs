const {Dog, Temperament} = require('../../db')

const createDog = async (dog) => {
    const {name, temperaments ,image,height,weight, life_span} = dog
    if(!name || name.length === 0 || !height || height.length === 0) {throw new Error('Name and height should be required ')}
    const [dogcreated, created] = await Dog.findOrCreate({
        where: {name: name},
        defaults: {
            height: height,
            image: image || 'https://es.vnmod.net/wp-content/uploads/2022/10/171020221665969380.png',
            weight: weight || '14 - 27',
            life_span: life_span || '8 - 15 years'
        }
    })

    if(created) {
        const relacion = await Temperament.findAll({
            where: {
                name: temperaments
            }
        })
        dogcreated.addTemperament(relacion)
        return 'It has been created'
    } else {
        throw new Error('It already exists')
    }
}

module.exports = { createDog }