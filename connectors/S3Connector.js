const config = require('../config');
const getFileLocation = require('../model');

const { getSignedUrl } = require("@aws-sdk/s3-request-presigner");
const { S3Client, GetObjectCommand } = require("@aws-sdk/client-s3");

function parseFileLocation(fileLocation) {
    // Input: "s3://<bucket>/<path/to/file>"
    // Output: {Bucket: <bucket>, Key: <path/to/file>}
    if (!fileLocation.startsWith('s3://')) {
        throw `Wrong format, file location must starts with "s3://", Location: ${fileLocation}`
    }
    const path = fileLocation.replace('s3://', '');
    const parts = path.split('/');
    const bucket = parts[0];
    const key = parts.splice(1).join('/');
    return {Bucket: bucket, Key: key};
}

async function getSignedURL(fileLocation) {
    if (config.fake) {
        return fileLocation;
    }
    const clientParams = {};
    const getObjectParams = parseFileLocation(fileLocation);

    const client = new S3Client(clientParams);
    const command = new GetObjectCommand(getObjectParams);
    return await getSignedUrl(client, command, { expiresIn: config.urlExpiresInSeconds });
}

module.exports = async function (fileId) {
    const location = await getFileLocation(fileId);
    if (!location) {
        throw `File location not found for file: ${fileId}`
    }
    return await getSignedURL(location);
}

