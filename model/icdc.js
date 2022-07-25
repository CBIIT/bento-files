const {getFileField} = require("../services/file-auth");
module.exports = {
    query: `query file($file_id: String){  
        file (uuid: $file_id)
        {
            file_location
        }
    }`,
    getLocation: (data) => {
        return getFileField(data, (data)=> data.file[0].file_location);
    }
};
