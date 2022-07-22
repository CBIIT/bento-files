/* File ACL Authentication */
// Return true or false
// compares user acl array with file acl array
// If a user has at least one acl value in a file acl array, it returns true
function authFileACL(userAclArr, fileAclArr) {
    if (!fileAclArr || !userAclArr) return false;
    const aclSet = new Set();
    for (let fileAcl of fileAclArr) aclSet.add(fileAcl);
    for (let acl of userAclArr) {
        if (aclSet.has(acl)) return true;
    }
    return false;
}

module.exports = {
    authFileACL
};