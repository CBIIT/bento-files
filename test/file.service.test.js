const {getFileField} = require("../services/file-auth");

describe('File Service Test', () => {
     test('/get file field test', async () => {
        const data = {
            file: [{file_location: 'location', acl: ['Open']}]
        }
        expect(getFileField(data, (data)=> data.file[0].file_location)).toBe('location');
        expect(getFileField(data, (data)=> data.file[0].acl)).toStrictEqual(['Open']);
    })
});