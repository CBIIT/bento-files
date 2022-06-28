const {getFileField} = require("../utils/file-util");

module.exports = {
    query: `query file($file_id: String){  
        fILE (UUID: $file_id)
        {
            FILE_LOCATION
        }
    }`,
    getLocation: (data) => {
        return getFileField(data, "FILE_LOCATION");
    },
    getAcl: (data) => {
        return getFileField(data, "acl");
    }
};
