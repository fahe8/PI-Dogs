const {Dog, Temperament} = require('../../db')

const createDog = async (dog) => {
    const {name, temperaments ,image,minHeight,maxHeight,minWeight,maxWeight, life_span} = dog
    if(!name  || !minHeight ||  !maxHeight || !minWeight, !maxWeight) {throw new Error('name and height should be required')}
    const [dogcreated, created] = await Dog.findOrCreate({
        where: {name: name},
        defaults: {
            minHeight: minHeight,
            maxHeight:maxHeight,
            image: image || 'https://es.vnmod.net/wp-content/uploads/2022/10/171020221665969380.png',
            minWeight: minWeight,
            maxWeight: maxWeight,
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
        return {msg:'It has been created', created:true}
    } else {
        throw new Error('It already exists')
    }
}

module.exports = { createDog }