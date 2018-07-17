const path = require('path');
const solc = require('solc');
const fs = require('fs-extra');

const buildPath = path.resolve(__dirname, 'build');
fs.removeSync(buildPath); // remove files and folders inside in a single coomand

const campaignPath = path.resolve(__dirname, 'contracts/Campaign.sol');
const source = fs.readFileSync(campaignPath, 'utf8');

const output = solc.compile(source, 1).contracts;

// Recreate build folder
fs.ensureDirSync(buildPath);

for (let contract in output) {
    fs.outputJsonSync(
        path.resolve(buildPath, contract.replace(':', '') + '.json'),
        output[contract]
    )
}