const getFileField = (data, callBack)=> {
    if (data && data.file && data.file.length > 0) {
        return callBack(data);
    } else {
        console.error("File not found in DB");
        return null;
    }
}

module.exports = {
    getFileField
};