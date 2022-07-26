const {getFileField, authFileACL} = require("../services/file-auth");
const {getFileACL} = require("../model");
const {strToArr} = require("../utils/string-util");

describe('File Service Test', () => {

    test('/file acl array & user acl array compare test', () => {
        const test = [
            {userAcl: [], fileAcl: ['OPEN'], result: true},
            {userAcl: [], fileAcl: ['opEn'], result: true},
            {userAcl: [], fileAcl: ['opEn.......'], result: false},
            {userAcl: ["armID-1", "armID-2"], fileAcl: ['Open'], result: true},
            {userAcl: [], fileAcl: ['Open', "armID-1"], result: true},
            {userAcl: ["armID-1",], fileAcl: ["armID-1"], result: true},
            {userAcl: ["armID-1",], fileAcl: ["armID-1", "armID-2"], result: true},
            {userAcl: ["armID-2","armID-3","armID-4"], fileAcl: ["armID-2"], result: true},
            {userAcl: ["armID-2","armID-3","armID-4"], fileAcl: ["armID-9"], result: false},
            {userAcl: [], fileAcl: ['Open'], result: true},
            {userAcl: [], fileAcl: [], result: false},
            {userAcl: null, fileAcl: "", result: false},
            {userAcl: null, fileAcl: null, result: false},
            {userAcl: [], fileAcl: null, result: false},
        ];

        for (let t of test) {
            const result = authFileACL(t.userAcl, t.fileAcl);
            expect(result).toBe(t.result);
        }
    });

    test('/string ACL convert test', async () => {
        getFileACL.mockReturnValue("['Open']");
        const strAclList = await getFileACL("BENTO-FILE-217910");
        const aclList = strToArr(strAclList);
        expect(Array.isArray(aclList)).toBe(true);
    });

     test('/get file field test', async () => {
        const data = {
            file: [{file_location: 'location', acl: ['Open']}]
        }
        expect(getFileField(data, (data)=> data.file[0].file_location)).toBe('location');
        expect(getFileField(data, (data)=> data.file[0].acl)).toStrictEqual(['Open']);
    })
});