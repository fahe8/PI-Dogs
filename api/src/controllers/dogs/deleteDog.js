const { Dog } = require("../../db");

const deleteDog = async (id) => {
    const dog = await Dog.findOne({
        where: {id:id}
    })
    if(!dog) {
        throw new Error ('This dog does not exist')
    }
    await dog.destroy()
    return 'Deleted'

};

module.exports = { deleteDog };
