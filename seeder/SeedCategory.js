const model = require('../models/index');

const seedInsert = async function () {
    try {
        const total = 100;
        let data = []
        for (let index = 0; index < total; index++) {
            data.push({
                name: "name" + index,
                slug: "name" + index,
                active: 0
            });
        }

        const insert = await model.category.insertMany(data);
        if (insert) {
            console.log("category seeding success " + total + " documents");
        }
    } catch (error) {
        console.log("category seeding failed");
        console.log(error);
    }
}
module.exports = seedInsert