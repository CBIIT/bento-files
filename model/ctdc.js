const {getFileField} = require("../utils/file-util");
module.exports = {
    query: `query file($file_id: String){  
        file (uuid: $file_id)
        {
            file_location
        }
    }`,
    getLocation: (data) => {
        return getFileField(data, "file_location");
    },
    getAcl: (data) => {
        return getFileField(data, "acl");
    }
};