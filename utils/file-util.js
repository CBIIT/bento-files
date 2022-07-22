const getFileField = (data)=> {
    if (data && data.file && data.file.length > 0) {
        return this.fileField;
    } else {
        console.error("File not found in DB");
        return null;
    }
}

function strToArr(str) {
    try {
        let arr = str.replace(/'/g, '"');
        arr = JSON.parse(arr);
        return Array.isArray(arr) ? arr : [];
    } catch (e) {
        console.error("invalid string array detected")
    }
    return [];
}

module.exports = {
    getFileField,
    strToArr
}