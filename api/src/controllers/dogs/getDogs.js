const axios = require("axios");
const {Dog, Temperament} = require("../../db")
const {minValue, maxValue} = require("../../helpers/minMax")

let allDogs = []

const getDogsDB = async () => {
    return await Dog.findAll({
      attributes: ["id", "name","maxHeight","minHeight","maxWeight","minWeight","image","life_span"],
      include: {
        model: Temperament,
        attributes: ["name"],
        through: {attributes:[]}
      }
    })
}

const getDogsApi = async () => {
  const {data} = await axios.get("https://api.thedogapi.com/v1/breeds");
  const info = data?.map((dog) => {
    const { id, name, image, height, weight ,temperament,life_span } = dog;

    const details = {
      id: id,
      name: name,
      image: image.url,
      minHeight: minValue(height.metric),
      maxHeight: maxValue(height.metric),
      minWeight: minValue(weight.metric),
      maxWeight: maxValue(weight.metric),
      
      temperaments: temperament,
      life_span:life_span
    };
    if(id == 179){
      details.minWeight = 22
      details.maxWeight = 30
    }
    allDogs.push(details)
    return details;
  });
  return info
}


const getDogs = async () => {
  const dogsDb = await  getDogsDB()
  const dogsApi = await getDogsApi()
  return [...dogsDb,...dogsApi]

};

module.exports = { getDogs, allDogs };
