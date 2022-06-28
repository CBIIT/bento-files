module.exports = {
    query: `query file($file_id: String){  
        file (uuid: $file_id)
        {
            file_location
        }
    }`,
    getLocation: data => {
        if (data && data.file && data.file.length > 0) {
            return data.file[0].file_location;
        } else {
            console.error("File not found in DB");
            return null;
        }
    }
};