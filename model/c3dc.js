const {getFileField} = require("../services/file-auth");
module.exports = {
    query: `query file($file_id: String){  
        file (UUID: $file_id)
        {
            FILE_LOCATION
        }
    }`,
    getLocation: (data) => {
        return getFileField(data, (data)=> data.file[0].FILE_LOCATION);
    }
};
