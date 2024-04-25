const { v4: uuidv4 } = require('uuid');


const uuiGenerator = () => {
    return uuidv4();
}

module.exports = uuiGenerator;