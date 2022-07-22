const {getFileField} = require("../utils/file-util");
module.exports = {
    query: `query file($file_id: String){  
        file (file_id: $file_id)
        {
            file_location,
            acl
        }
    }`,
    getLocation: (data) => {
        getFileField.bind({fileField: data.file[0].file_location});
        return getFileField(data);
    },
    getAcl: (data) => {
        getFileField.bind({fileField: data.file[0].acl});
        return getFileField(data);
    }
};
