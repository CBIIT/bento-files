function getFileField(data, fieldName) {
    if (data && data.file && data.file.length > 0) {
        return data.file[0][fieldName];
    } else {
        console.error("File not found in DB");
        return null;
    }
}

module.exports = {
    getFileField
}