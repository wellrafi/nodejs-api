const SeedCategory = require('./seeder/SeedCategory');
const SeedSupplier = require('./seeder/SeedSupplier');

function runSeed() {
    SeedCategory();
    SeedSupplier();
}

runSeed();