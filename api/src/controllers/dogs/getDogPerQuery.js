const axios = require('axios')
const getDogQuery = async (dog) => {
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

module.exports = {getDogQuery}