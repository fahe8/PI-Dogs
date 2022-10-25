const axios = require("axios");
const {Dog, Temperament} = require("../../db")

let allDogs = []

const getDogsDB = async () => {
    return await Dog.findAll({
      attributes: ["id", "name","height","image"],
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
    const newTemp = temperament?.split(', ')
    const details = {
      id: id,
      name: name,
      image: image.url,
      height: height.metric,
      weight: weight.metric,
      temperaments: newTemp,
      life_span:life_span
    };
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
