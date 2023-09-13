const config = require('../config');
const {isAuthorizedAccess} = require("../services/file-auth");
const {getFileACL} = require("../model");
const {strToArr} = require("./string-util");
const {isAdminUser, getApprovedUserAcls} = require("../services/user-auth");

module.exports = function (exceptions) {
    return async function(req, res, next) {
        // Open if file authentication env variable disabled
        if (!config.authEnabled) return next();
        if (exceptions && exceptions.includes(req.path)) return next();
        try {
            if (req.session && req.session.userInfo) {
                // Pass if ACL authenticator not enabled
                if (!config.authorizationEnabled) return next();
                // Search file ACL from Bento-backend API
                const fileId = req.path.replace("/api/files/", "");
                const cookie = req.headers.cookie;
                const fileAcl = await getFileACL(fileId, cookie);
                const userAcl = getApprovedUserAcls(req.session.userInfo.acl);
                // Open all file access to Admin user
                if (isAdminUser(req.session.userInfo)) return next();
                // Inspect file accessibility
                if (isAuthorizedAccess(userAcl, strToArr(fileAcl))) return next();
                return res.status(403).send('Not authorized!');
            }
            return res.status(401).send('Not authenticated!');
        } catch (e) {
            console.log(e);
            return res.status(500).send(e);
        }
    }
}