const model = require('../models/index');

const seedInsert = async function () {
    try {
        const total = 100;
        let data = []
        for (let index = 0; index < total; index++) {
            data.push({
                name: "name" + index,
                slug: "name" + index,
                address: "alamat saya anjay" + index,
                noTelp: "098120938" + index,
                active: 1
            });
        }

        const insert = await model.supplier.insertMany(data);
        if (insert) {
            console.log("supplier seeding success " + total + " documents");
        }
    } catch (error) {
        console.log("supplier seeding failed");
        console.log(error);
    }
}
module.exports = seedInsert