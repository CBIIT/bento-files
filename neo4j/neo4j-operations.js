const {DownloadEvent} = require("../bento-event-logging/model/download-event");
const {logEvent, getFileByID} = require("../bento-event-logging/neo4j/neo4j-operations");
const neo4j = require("neo4j-driver");
const config = require("../config");
const ANONYMOUS_USER = "Anonymous User";

const neo4jConnection = neo4j.driver(
    config.neo4j_uri,
    neo4j.auth.basic(config.neo4j_user, config.neo4j_password),
    {disableLosslessIntegers: true}
);
const storeDownloadEvent = async function(userInfo, fileID){
    let userID, email, idp;
    if (userInfo === undefined || !userInfo.userID){
        userID = ANONYMOUS_USER;
        email = ANONYMOUS_USER;
        idp = ANONYMOUS_USER;
    }
    else{
        userID = userInfo.userID;
        email = userInfo.email;
        idp = userInfo.IDP;
    }
    let file = await getFileByID(neo4jConnection, fileID);
    if (file) {
        const downloadEvent = new DownloadEvent(userID, email, idp, file.properties.file_format, fileID, file.properties.file_name, file.properties.file_size);
        await logEvent(neo4jConnection, downloadEvent);
    }
};

module.exports = {
    storeDownloadEvent
}

