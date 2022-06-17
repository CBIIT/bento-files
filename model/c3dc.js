const {getFileField} = require("../utils/file");

module.exports = {
    query: `query file($file_id: String){  
        file (UUID: $file_id)
        {
            FILE_LOCATION
        }
    }`,
    getLocation: data => {
        return getFileField(data, "FILE_LOCATION");
    },
    getAcl: data => {
        return getFileField(data, "acl");
    }
};
