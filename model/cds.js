const {getFileField} = require("../services/file-auth");
module.exports = {
    query: `query file($file_id: String){  
        file (file_id: $file_id)
        {
            file_url_in_cds
        }
    }`,
    getLocation: (data) => {
        return getFileField(data, (data)=> data.file[0].file_url_in_cds);
    }
};
