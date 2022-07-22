const config = require('../config');
const {authFileACL} = require("../services/file-auth");

module.exports = function (exceptions) {
    if (config.authEnabled) {
        return async function(req, res, next) {
            if (exceptions && exceptions.includes(req.path)) {
                return next();
            }
            try {
                if (req.session && req.session.userInfo) {
                    if (!config.authorizationEnabled) return next();
                    // Search ACL in Bento-Backend API
                    const fileId = req.path.replace("/api/files/", "");
                    const fileAcl = await getFileACL(fileId);
                    if (authFileACL(req.session.userInfo.acl, fileAcl)) return next();
                }
                return res.status(403).send('Not authenticated!');
            } catch (e) {
                console.log(e);
                return res.status(500).send(e);
            }
        }
    } else {
        return function (req, res, next) {
            return next();
        }
    }
}