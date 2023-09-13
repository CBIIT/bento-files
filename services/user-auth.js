const {isCaseInsensitiveEqual} = require("../utils/string-util");
const {APPROVED} = require("../bento-event-logging/const/access-constant");

const ADMIN_ROLE= 'admin';
const ACTIVE_STATUS = 'active';

const isAdminUser = (userInfo) => {
    if (!userInfo.role || !userInfo.userStatus) return false;
    const isActiveUser = isCaseInsensitiveEqual(userInfo.userStatus, ACTIVE_STATUS);
    const isAdmin = isCaseInsensitiveEqual(userInfo.role, ADMIN_ROLE);
    if (isActiveUser && isAdmin) return true;
    return false;
}
// File can only downloadable with Approved status
const getApprovedUserAcls = (acls) => {
    if (!acls) return [];
    return acls
        .filter((acl)=> (acl.armID) && (acl.armID !='') && isCaseInsensitiveEqual(acl.accessStatus, APPROVED))
        .map((acl)=> acl.armID);
}

module.exports = {
    isAdminUser,
    getApprovedUserAcls
};