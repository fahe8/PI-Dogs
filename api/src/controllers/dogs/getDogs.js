const axios = require("axios");

const getDogs = async () => {
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
      temperament: newTemp,
      life_span:life_span
    };
    return details;
  });

  return info
};

module.exports = { getDogs };
