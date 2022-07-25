const {getFileField} = require("../services/file-auth");
module.exports = {
    query: `query file($file_id: String){  
        file (file_id: $file_id)
        {
            file_location,
            acl
        }
    }`,
    getLocation: (data) => {
        return getFileField(data, (data)=> data.file[0].file_location);
    },
    getAcl: (data) => {
        return getFileField(data, (data)=> data.file[0].acl);
    }
};
