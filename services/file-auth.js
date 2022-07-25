/* File ACL Authentication */
// Return true or false
// compares user acl array with file acl array
// If a user has at least one acl value in a file acl array, it returns true
const {isCaseInsensitiveEqual} = require("../utils/string-util");
const OPEN = 'open';

function authFileACL(userAclArr, fileAclArr) {
    if (!fileAclArr || !userAclArr) return false;
    const aclSet = new Set();
    for (let fileAcl of fileAclArr) {
        // if a file has “open” in ACL, any authenticated user can access this file
        if (isCaseInsensitiveEqual(fileAcl, OPEN)) return true;
        aclSet.add(fileAcl);
    }
    for (let acl of userAclArr) {
        if (aclSet.has(acl)) return true;
    }
    return false;
}

const getFileField = (data, callBack)=> {
    if (data && data.file && data.file.length > 0) {
        return callBack(data);
    } else {
        console.error("File not found in DB");
        return null;
    }
}

module.exports = {
    authFileACL,
    getFileField
};