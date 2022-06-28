const config = require('../config');
const bent = require('bent');
const {getFileACL} = require("../model");

module.exports = function (exceptions) {
    if (config.authEnabled) {
        return async function(req, res, next) {
            if (exceptions && exceptions.includes(req.path)) {
                return next();
            }
            try {
                const cookie = req.headers.cookie;
                if (cookie) {
                    const fileId = req.path.replace("/api/files/", "");
                    const reqBody = {Cookie: cookie,
                    // Optional ACL Authentication When authorizationEnabled Enabled
                    ...(config.authorizationEnabled && {
                        acl: await getFileACL(fileId)
                    })};
                    const auth = bent('POST',  'json',  reqBody);
                    // Trigger Bento-Auth-Backend API
                    const result = await auth(config.authUrl);
                    if (result && result.status) return next();
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