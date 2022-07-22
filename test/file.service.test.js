const {authFileACL} = require("../services/file-auth");
const {getFileACL} = require("../model");
const {strToArr, getFileField} = require("../utils/file-util");

jest.mock('../model')

describe('Util Test', () => {
    test('/file acl array & user acl array compare test', () => {
        const test = [
            {userAcl: ['Open'], fileAcl: ['Open'], result: true},
            {userAcl: ['Open'], fileAcl: ['Open', 'Closed'], result: true},
            {userAcl: ['Open'], fileAcl: ['Closed'], result: false},
            {userAcl: [], fileAcl: ['Open'], result: false},
            {userAcl: ['Open', 'Closed'], fileAcl: ['Closed'], result: true},
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

    test('/bind test', async () => {
        const data = {
            file: [{file_location: 'yes'}]
        }
        getFileField.bind({fileField: data.file[0].file_location});
        const result = getFileField(data);
        console.log();

    })
});